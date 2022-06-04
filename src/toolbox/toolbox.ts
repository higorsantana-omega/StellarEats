import 'dotenv/config'
import ToolBox from './IToolbox'

import * as uuid from 'uuid'
import bcrypt from 'bcrypt'

class ToolBoxImpl implements ToolBox {
  hashCompare (correctPassword: string, enteredPassword: string): boolean {
    return bcrypt.compareSync(enteredPassword, correctPassword)
  }

  encrypt (data: string): string {
    return bcrypt.hashSync(data, 10)
  }

  generateUUID (): string {
    return uuid.v4()
  }
}

const toolbox = new ToolBoxImpl()
export default toolbox
