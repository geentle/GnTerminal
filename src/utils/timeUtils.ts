/* 
    把秒数时间转成 HH:mm:ss
*/
const secondFormatter = (second: number) => {
    let ss = second % 60
    let mm = Math.floor(second / 60) % 60
    let HH = Math.floor(second / (60 * 60))

    return `${HH === 0 ? '' : HH + ':'}${(mm + ':').padStart(2, '0')}${(
        ss + ''
    ).padStart(2, '0')}`
}

export { secondFormatter }
