import { CommandType } from '../../command'
import loginCommand from './loginCommand'
import logoutCommand from './logoutCommand'
import registCommand from './registCommand'

const userCommand: CommandType[] = [loginCommand, logoutCommand, registCommand]
export default userCommand
