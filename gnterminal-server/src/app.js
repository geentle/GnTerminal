const express = require('express')

require('express-async-errors')
const jwtUtils = require('./utils/jwtUtils')
const morgan = require('morgan')
const MyError = require('./exception/index')

const { FORBIDDEN_ERROR_CODE } = require('./exception/errorCode')

// 限制接口访问次数的库
const rateLimit = require('express-rate-limit')

// 创建 app
const app = express()

// CORS 配置
if (process.env.NODE_ENV !== 'prod') {
    const cors = require('cors')
    app.use(
        cors({
            // Access-Control-Allow-Origin
            // origin: ['http://127.0.0.1:5173'],
            origin: '*',
            // Access-Control-Allow-Methods
            methods: ['GET', 'POST'],
            // Access-Control-Allow-Headers
            allowedHeaders: ['Origin', 'Content-Type', 'Token'],
        })
    )
}

// 请求大小限制
const requestLimit = '5120kb'

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // statusCode: 200,
    message: (req, res) => {
        return {
            code: FORBIDDEN_ERROR_CODE,
            message: '您每天只能使用此命令30次！',
        }
    },
})

// 限制 api 访问次数
app.use('/bilibili', limiter)

// 请求日志
app.use(morgan('short'))
// 解析 body 配置
app.use(express.urlencoded({ extended: false, limit: requestLimit }))
app.use(express.json({ limit: requestLimit }))

// 拦截器 验证 token
app.use(function (req, res, next) {
    console.log('TimeStamp:', Date.now())
    console.log('Time:', Date().toString())
    // 有 token
    if (req.headers.token) {
        const token = req.headers.token
        const res = jwtUtils.verify(token)
        if (res.status === 'success') {
            // 把解析结果挂到请求上
            req.tokenData = res.data
        } else {
            if (res.type === 'expired') {
                // token expired
                console.log('token expired')
            } else {
                // token invalid
                console.log('token invalid')
            }
        }
    }
    // console.log('拦截器：', req.tokenData)
    next()
})

// user 路由
app.use('/user', require('./routes/user'))

// music 路由
app.use('/music', require('./routes/music'))

// 背景 路由
app.use('/bg', require('./routes/background'))

// bilibili 视频路由
app.use('/bilibili', require('./routes/biilibili'))

// favor 路由
app.use('/favor', require('./routes/favor'))

app.get('/ping', (req, res) => {
    console.log('pong')
    res.send({
        code: 200,
        ping: 'pong',
    })
    console.log(req.tokenData)
})

// 统一返回
app.use(function (data, req, res, next) {
    // console.log('统一返回', data)
    if (data instanceof MyError) {
        // 如果是自定义错误
        res.send({
            code: data.code,
            message: data.message,
            data: null,
        })
        console.error(`req error path = ${req.path}`)
        console.log(data)
    } else if (data instanceof Error) {
        // 如果是错误
        res.send({
            code: 500,
            data: null,
            message: 'server error',
        })
        console.error(`req error path = ${req.path}`)
        console.log(data)
    } else {
        // 成功
        res.send({
            code: 200,
            data: data,
            message: 'success',
        })
        console.log(`req end path = ${req.path}`)
    }
})

module.exports = app
