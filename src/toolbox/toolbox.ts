import 'dotenv/config'
import ToolBox from './IToolbox'

import * as uuid from 'uuid'

class ToolBoxImpl implements ToolBox {
  generateUUID (): string {
    return uuid.v4()
  }
}

const toolbox = new ToolBoxImpl()
export default toolbox
