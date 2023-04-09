// 收藏夹类型，仿 linux 文件系统
interface FavorType {
    [dir: string]: FavorItemType
}
// 收藏夹项目类型，仿 linux 文件系统
interface FavorItemType {
    name: string
    link?: string
    dir: string // 全路径
    type: 'dir' | 'link'
}
