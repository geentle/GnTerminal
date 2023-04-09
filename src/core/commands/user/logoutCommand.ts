import { CommandType } from '../../command'
import { useUserStore } from '@/stores/userStore'
import { LOCAL_USER } from './userConstant'
import { ParsedOptions } from 'getopts'
import { removeToken, getToken } from '@/utils/auth'

/* 
    用户注销登录
*/
const logoutCommand: CommandType = {
    command: 'logout',
    name: '用户注销',
    desc: '用户注销登录',
    options: [],
    args: [],
    async action(options: ParsedOptions, terminal: TerminalType) {
        if (getToken()) {
            const { setLoginUser } = useUserStore()
            // 去掉 token
            removeToken()
            // 重置 user
            setLoginUser(LOCAL_USER)
            terminal.writeTextSuccessResult('已退出登录')
        } else {
            terminal.writeTextErrorResult('因用户未登录，所以注销失败')
        }
    },
}

export default logoutCommand
