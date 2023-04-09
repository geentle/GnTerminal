import { CommandType } from './command'
import searchCommand from './commands/search/searchCommand'
import hintCommand from './commands/hint/hintCommand'
import historyCommand from './commands/history/historyCommand'
import clearCommand from './commands/clear/clearCommand'
import favorCommand from './commands/favor/favorCommand'
import helpCommand from './commands/help/helpCommand'
import userCommand from './commands/user/userCommand'
import pingCommand from './commands/ping/pingCommand'
import backgroundCommand from './commands/background/backgroundCommand'
import timerCommand from './commands/time/timerCommand'
import musicCommand from './commands/music/musicCommand'
import hotCommand from './commands/hot/hotCommand'
import hotVideoCommand from './commands/hot/hotVideoCommand'

const commandList: CommandType[] = [
    ...searchCommand,
    hintCommand,
    historyCommand,
    clearCommand,
    ...favorCommand,
    helpCommand,
    ...userCommand,
    pingCommand,
    backgroundCommand,
    timerCommand,
    musicCommand,
    hotCommand,
    hotVideoCommand,
]

const commandMap: Map<string, CommandType> = new Map()

commandList.forEach((command) => {
    commandMap.set(command.command, command)
    command.alias?.forEach((name) => {
        commandMap.set(name, command)
    })
})

export { commandMap, commandList }
