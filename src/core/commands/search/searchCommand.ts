import { CommandType } from '../../command'
import baiduCommand from './baiduCommand'
import googleCommand from './googleCommand'
import bingCommand from './bingCommand'
import baidudevCommand from './baidudevCommand'
import googleScholarCommand from './googleScholarCommand'
import zhihuCommand from './zhihuCommand'
import doubanCommand from './doubanCommand'
import juejinCOmmand from './juejinCommand'
import githubCommand from './githubCommand'
import stackoverflowCommand from './stackoverflowCommand'
import wangyiyunCommand from './wangyiyunCommand'
import mdnCommand from './mdnCommand'

const searchCommand: CommandType[] = [
    baiduCommand,
    googleCommand,
    bingCommand,
    baidudevCommand,
    googleScholarCommand,
    zhihuCommand,
    doubanCommand,
    juejinCOmmand,
    githubCommand,
    stackoverflowCommand,
    wangyiyunCommand,
    mdnCommand,
]
export default searchCommand
