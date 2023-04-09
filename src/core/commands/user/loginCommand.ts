import { CommandType } from '../../command'
import { ParsedOptions } from 'getopts'
import { userLogin } from '@/api/user'
import { useUserStore } from '@/stores/userStore'
import { setToken } from '@/utils/auth'

const loginCommand: CommandType = {
    command: 'login',
    name: '用户登录',
    desc: '进行用户登录',
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
    ],
    async action(options: ParsedOptions, terminal: TerminalType) {
        const { username, password } = options
        if (!username) {
            terminal.writeTextErrorResult('请输入用户名')
            return
        }
        if (!password) {
            terminal.writeTextErrorResult('请输入密码')
            return
        }
        try {
            const res: any = await userLogin(username, password)
            const { setLoginUser } = useUserStore()
            const { user, token } = res.data
            // 保存 token
            setToken(token)
            // 设置 logined user
            setLoginUser(user)
            terminal.writeTextSuccessResult('登录成功')
        } catch (err) {
            terminal.writeTextErrorResult(err + '' ?? '登录失败')
        }
    },
}

export default loginCommand
