// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()
const port = process.env.NODE_DOCKER_PORT || '8080'
import Server from "./server"
import {PythonShell} from 'python-shell'
import { ObjPython } from "./types"

const options:ObjPython = {
    args: []
}

if (require.main === module) {
    new Server().runServer(port)
    console.log('API funcionando!')
    
    if (process.env.TS_NODE_DEV) {
        options.args = ['-e', 'development']
    }
    
    PythonShell.run('./consumer/index.py', options, function (err) {
        if (err) throw err
        console.log('finished')
    })
}

export default Server