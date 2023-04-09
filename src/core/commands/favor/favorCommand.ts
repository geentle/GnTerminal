import { CommandType } from '../../command'
import addCommand from './addCommand'
import cdCommand from './cdCommand'
import copyCommand from './copyCommand'
import downloadFavorCommand from './downloadFavorCommand'
import listCommand from './listCommand'
import mkdirCommand from './mkdirCommand'
import moveCommand from './moveCommand'
import pwdCommand from './pwdCommand'
import removeCommand from './removeCommand'
import uploadFavorCommand from './uploadFavorCommand'

const favorCommand: CommandType[] = [
    addCommand,
    listCommand,
    mkdirCommand,
    cdCommand,
    pwdCommand,
    removeCommand,
    copyCommand,
    moveCommand,
    uploadFavorCommand,
    downloadFavorCommand,
]
export default favorCommand
