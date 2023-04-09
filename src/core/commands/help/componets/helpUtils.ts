import { CommandType } from '../../../command'

// 将 命令实例 格式化为 用法字符串
export const usageStrFormatter = function (command: CommandType): string {
    let formatStr = ''
    formatStr += command.command
    if (command.args && command.args.length > 0) {
        let argList: string[] = command.args?.map((value) => {
            if (value.required) {
                return ` <${value.desc}>`
            } else {
                return ` [${value.desc}]`
            }
        })
        formatStr += ' ' + argList.join(' ')
    }
    if (command.options && command.options.length > 0) {
        let optList: string[] = command.options?.map((value) => {
            let alias = ''
            if (value.alias) {
                alias = `-${value.alias[0]}`
            } else {
                alias = `--${value.name}`
            }
            if (value.required) {
                return `<${alias} ${value.desc}>`
            } else {
                return `[${alias} ${value.desc}]`
            }
        })
        formatStr += ' ' + optList.join(' ')
    }
    formatStr += ' ' + '（功能：' + command.name + '）'
    return formatStr
}
