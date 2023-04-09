const jwt = require('jsonwebtoken')

const SECRET = 'geentle4396'
const EXPIRESIN = '7d'

/* 
    生成 token
*/
exports.generateToken = (id) => {
    return jwt.sign({ userId: id }, SECRET, { expiresIn: EXPIRESIN })
}
/* 
    验证 token
 */
exports.verify = (token) => {
    let res
    try {
        res = {
            status: 'success',
            data: jwt.verify(token, SECRET),
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res = {
                status: 'error',
                type: 'expired',
            }
        } else {
            res = {
                status: 'error',
                type: 'invalid',
            }
        }
    }
    console.log('jwt verify', res)
    return res
}
