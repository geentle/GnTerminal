import request from '@/utils/request'

/* 
    把本地书签同步到服务器
*/
const syncFavor = (favorContent: string) => {
    if (!favorContent) {
        return null
    }
    return request.post('/favor/sync', {
        favorContent,
    })
}

/* 
    获取服务器中的书签
*/
const getServerFavor = () => {
    return request.get('/favor/get')
}

export { syncFavor, getServerFavor }
