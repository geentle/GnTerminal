import { defineStore } from 'pinia'
import { getLoginUser } from '../api/user'
import { LOCAL_USER } from '../core/commands/user/userConstant'
import UserType = User.UserType
import { Names } from './store-name'

/* 
    用户命令
*/
export const useUserStore = defineStore(Names.USER, {
    state: () => ({
        loginUser: {
            ...LOCAL_USER,
        },
    }),
    getters: {},
    // 持久化
    persist: {
        key: 'user-store',
        storage: window.localStorage,
        beforeRestore: (context) => {
            console.log('load userStore data start')
        },
        afterRestore: (context) => {
            console.log('load userStore data end')
        },
    },
    actions: {
        async getAndSetLoginUser() {
            try {
                const res: any = await getLoginUser()
                if (res.data) {
                    this.loginUser = res.data
                } else {
                    console.error('登录失败')
                    this.$reset()
                }
            } catch (err) {
                console.log('getLoginUser', err)
                this.$reset()
            }
        },
        setLoginUser(user: UserType) {
            this.loginUser = user
        },
    },
})
