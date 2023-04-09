import { CommandType } from '../../command'
import { useTerminalStore } from '../../../stores/terminalStore'
import { getBingRandomBackground } from '../../../api/background'

/*
    切换终端背景
 */
const backgroundCommand: CommandType = {
    command: 'background',
    name: '切换终端背景',
    desc: '设置终端壁纸, 或bing随机壁纸',
    alias: ['bg'],
    args: [
        {
            name: 'url',
            desc: '图片地址（不填则随机）',
            required: false,
        },
    ],
    options: [
        {
            name: 'reset',
            alias: ['r'],
            desc: '恢复默认背景',
            required: false,
            type: 'boolean',
        },
    ],
    async action(options, terminal) {
        const { _, reset } = options
        const { setBackground, resetBackground } = useTerminalStore()
        if (reset) {
            resetBackground()
            terminal.writeTextSuccessResult('重置壁纸成功')
            return
        }
        let url = ''
        if (_.length > 0) {
            url = _[0]
        }
        if (!url) {
            // 随机获取壁纸
            try {
                const res = await getBingRandomBackground()
                url = res.data.url
            } catch (err) {
                terminal.writeTextErrorResult('获取 bing 随机壁纸失败')
                console.log(err, '获取 bing 随机壁纸失败')
                return
            }
        }
        terminal.writeTextSuccessResult('切换壁纸成功')
        setBackground(url)
    },
}

export default backgroundCommand
