import { CommandType } from '../../command'
import dayjs from '@/utils/day'

/**
 * 日期命令
 * @author yupi
 */
const dateCommand: CommandType = {
    command: 'date',
    name: '日期',
    desc: '查看日期',
    args: [],
    options: [],
    action(options, terminal): void {
        const dateStr = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const output = `当前时间：${dateStr}`
        terminal.writeTextResult(output)
    },
}

export default dateCommand
