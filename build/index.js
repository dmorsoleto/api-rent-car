"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const port = process.env.NODE_DOCKER_PORT || '8080';
const server_1 = __importDefault(require("./server"));
const python_shell_1 = require("python-shell");
const options = {
    args: []
};
if (require.main === module) {
    new server_1.default().runServer(port);
    console.log('API funcionando!');
    if (process.env.TS_NODE_DEV) {
        options.args = ['-e', 'development'];
    }
    python_shell_1.PythonShell.run('./consumer/index.py', options, function (err) {
        if (err)
            throw err;
        console.log('finished');
    });
}
exports.default = server_1.default;
