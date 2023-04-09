import axios from 'axios'
import { getToken } from './auth'

// 自定义 axios 实例
const request = axios.create({
    baseURL:
        // @ts-ignore
        import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:3000',
    timeout: 5000, // 请求超时时间
})

// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        // 在发送请求之前取 token，把 token 放到请求头
        if (getToken()) {
            config.headers.Token = getToken() || ''
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log('request.ts 请求错误:', error) // for debug
        return Promise.reject(error)
    }
)

// 添加响应拦截器
request.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    function (response) {
        // 正常响应了 => 根据自定义的状态码处理
        const res = response.data
        // 不是200，就是错误
        if (res.code !== 200) {
            /* 
            REQUEST_PARAMS_ERROR_CODE = 40000
            NO_AUTH_ERROR_CODE = 40100
            FORBIDDEN_ERROR_CODE = 40300
            NOT_FOUND_ERROR_CODE = 40400
            SYSTEM_ERROR_CODE = 50000
            THIRD_PART_SERVICE_ERROR_CODE = 50010
        */
            if (
                res.code === 40000 ||
                res.code === 40100 ||
                res.code === 40300 ||
                res.code === 40400 ||
                res.code === 50000 ||
                res.code === 50010
            ) {
                // 处理异常的代码写这里
            }
            let errorMessage: string = res.message || 'error'
            return Promise.reject(errorMessage)
        } else {
            // 正常就返回 response.data
            return res
        }
    },
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    function (error) {
        console.log(error)
        let errorMessage = error.response.data.message || error.message
        return Promise.reject(errorMessage)
    }
)

export default request
