import { CommandType } from '../../command'
import { userRegister } from '@/api/user'
import { ParsedOptions } from 'getopts'

/* 
    用户注册
*/
const registCommand: CommandType = {
    command: 'regist',
    name: '用户注册',
    desc: '用户注册',
    options: [
        {
            name: 'username',
            desc: '用户名',
            alias: ['u'],
            type: 'string',
            required: true,
        },
        {
            name: 'password',
            desc: '密码',
            alias: ['p'],
            type: 'string',
            required: true,
        },
        {
            name: 'email',
            desc: '邮箱',
            alias: ['e'],
            type: 'string',
            required: true,
        },
    ],
    async action(options: ParsedOptions, terminal: TerminalType) {
        const { username, password, email } = options
        if (!username) {
            terminal.writeTextErrorResult('缺少用户名')
            return
        }
        if (!password) {
            terminal.writeTextErrorResult('缺少密码')
            return
        }
        if (!email) {
            terminal.writeTextErrorResult('缺少邮箱')
            return
        }
        try {
            await userRegister(username, password, email)
            terminal.writeTextSuccessResult('注册成功')
        } catch (err) {
            terminal.writeTextErrorResult(err + '' ?? '注册失败')
        }
    },
}

export default registCommand
