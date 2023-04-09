// 匹配 URL 正则
const URL_REG =
    /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

// 识别文本中的URL
const smartText = (text?: string): string => {
    if (!text) {
        return ''
    }
    const reg = new RegExp(URL_REG, 'gi')
    return text.replaceAll(reg, "<a href='$1' target='_blank'>$1</a>")
}

export default smartText
