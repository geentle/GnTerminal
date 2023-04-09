import { defineStore } from 'pinia'
import { Names } from './store-name'
export const useFavorStore = defineStore(Names.FAVOR, {
    state: () => ({
        favor: {
            '/': {
                name: '/',
                dir: '/',
                type: 'dir',
            } as FavorItemType,
        } as FavorType,
        currentDir: '/',
    }),
    getters: {},
    // 持久化
    persist: {
        key: 'favor-store',
        storage: window.localStorage,
        beforeRestore: (context) => {
            console.log('load terminalConfigStore data start')
        },
        afterRestore: (context) => {
            console.log('load terminalConfigStore data end')
        },
    },
    actions: {
        /* 获得某个项目 */
        getItem(key: string) {
            const fullPath = getFullPath(this.currentDir, key)
            return this.favor[fullPath]
        },
        /* 增加一个项目 */
        addItem(item: FavorItemType): boolean {
            const fullPath = getFullPath(item.dir, item.name)
            if (!this.favor[item.dir]) {
                // 目录不存在
                return false
            }
            if (this.favor[fullPath]) {
                // 文件已存在
                return false
            }
            this.favor[fullPath] = item
            return true
        },
        /* 删除一个项目 */
        deleteItem(path: string, recursive = false): boolean {
            path = this.pathExist(path)
            if (!this.favor[path]) {
                // 项目 不存在
                return false
            }
            let deleteList = [path]
            if (recursive || this.favor[path].type === 'dir') {
                // 如果需要递归删除或文件夹必须递归删除
                for (let favorPath in this.favor) {
                    if (favorPath.startsWith(path)) {
                        deleteList.push(favorPath)
                    }
                }
            }
            deleteList.forEach((deletePath) => {
                delete this.favor[deletePath]
            })
            return true
        },
        /* 修改一个项目 */
        updateItem(item: FavorItemType): boolean {
            const fullPath = getFullPath(item.dir, item.name)
            if (!this.favor[fullPath]) {
                // 项目 不存在
                return false
            }
            this.favor[fullPath] = item
            return true
        },
        /* cd 操作 */
        gotoDir(dir: string): string {
            const fullPath = getFullPath(this.currentDir, dir)
            if (!this.favor[fullPath]) {
                // 项目 不存在
                return `目录 ${fullPath} 不存在`
            }
            if (this.favor[fullPath].type !== 'dir') {
                return '输入参数非目录'
            }
            this.currentDir = fullPath
            return 'success'
        },
        /* 显示一个目录的所有项目 */
        listDir(dir: string): FavorItemType[] {
            let ans: FavorItemType[] = []
            for (let key in this.favor) {
                if (this.favor[key].dir === dir) {
                    ans.push(this.favor[key])
                }
            }
            return ans
        },
        /* 显示当前目录所有项目 */
        listCurDir(): FavorItemType[] {
            return this.listDir(this.currentDir)
        },
        /* 退一步 */
        backCurDir(): string {
            if (
                this.currentDir === '/' ||
                this.currentDir.indexOf('/') ===
                    this.currentDir.lastIndexOf('/')
            ) {
                // 如果是根目录或退了就是根目录，则就到根目录
                this.currentDir = '/'
                return '/'
            } else {
                let newDir = this.currentDir.slice(
                    0,
                    this.currentDir.lastIndexOf('/')
                )
                this.currentDir = newDir
                return newDir
            }
        },
        /* 复制item */
        copyItem(source: string, target: string, recursive = false) {
            const sourcePath = this.pathExist(source)
            const targetPath = this.pathExist(target)
            // console.log(sourcePath, targetPath, 'sourcePath,targetPath')
            // 如果原路径或目标路径不存在
            if (!sourcePath || !targetPath) {
                return false
            }
            // console.log(this.favor[targetPath], 'this.favor[targetPath]')
            // 如果目标路径不是文件夹
            if (this.favor[targetPath].type !== 'dir') {
                // 如果目标路径不是文件夹
                return false
            }
            // 原item
            const sourceItem = this.favor[sourcePath]
            // 复制
            const cpItem = Object.assign({}, this.favor[sourcePath])
            cpItem.dir = targetPath
            // 添加到新的
            this.addItem(cpItem)
            // 如果cpItem是文件夹则递归处理子文件
            if (sourceItem.type === 'dir' || recursive) {
                for (let itemPath in this.favor) {
                    if (itemPath.startsWith(sourcePath)) {
                        let tmp = Object.assign({}, this.favor[itemPath])
                        tmp.dir = tmp.dir.replace(
                            sourcePath,
                            getFullPath(cpItem.dir, cpItem.name)
                        )
                        console.log(tmp.dir, 'tmp')
                        this.addItem(tmp)
                    }
                }
            }
            return true
        },
        /* 移动item */
        moveItem(source: string, target: string, recursive = false) {
            let result = this.copyItem(source, target, recursive)
            console.log(result, 'copyItem')
            if (result) {
                const sourcePath = this.pathExist(source)
                result = this.deleteItem(sourcePath, recursive)
                console.log(result, 'deleteItem')
            }
            return result
        },
        /* 路径是否存在 */
        /* 
            优先作为相对路径看有没有
            在看绝对路径有没有
        */
        pathExist(path: string) {
            const fullPath = getFullPath(this.currentDir, path)
            // 相对路径存在，返回对应的绝对路径
            if (this.favor[fullPath]) {
                return fullPath
            }
            // 绝对路径存在，返回绝对路径
            if (this.favor[path]) {
                return path
            }
            return ''
        },
        /* 
            设置当前书签
        */
        setFavor(favor: FavorType) {
            this.favor = favor
        },
    },
})
/* 获取全路径 */
const getFullPath = (dir: string, name: string): string => {
    return dir + (dir === '/' ? '' : '/') + name
}
