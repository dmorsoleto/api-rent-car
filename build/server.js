"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = require("./routes");
const ejs_1 = __importDefault(require("ejs"));
const repository_1 = __importDefault(require("./Cars/repository"));
const repository_2 = __importDefault(require("./Adms/repository"));
const uriMongo = database_1.default.url;
class Server {
    constructor(initWhDB) {
        this.initializeWithoutDB = false;
        if (initWhDB) {
            this.initializeWithoutDB = initWhDB;
        }
        this.expressEntity = (0, express_1.default)();
        this.middlewares();
        this.routes();
        if (!this.initializeWithoutDB) {
            this.database();
        }
    }
    runServer(port) {
        this.expressEntity.listen(port, () => console.log(`Listening on port ${port}!`));
    }
    getExpress() {
        return this.expressEntity;
    }
    database() {
        console.log('uriMongo', uriMongo);
        mongoose_1.default.connect(uriMongo).then(() => {
            console.log("connected!");
            repository_1.default.createCarsDummyData();
            repository_2.default.createAdmsDummyData();
        })
            .catch((err) => {
            console.log("can't connect!", err);
        });
    }
    middlewares() {
        this.expressEntity.use((0, helmet_1.default)());
        this.expressEntity.use(express_1.default.json({ limit: "9091990mb" }));
        this.expressEntity.use(express_1.default.urlencoded({ extended: true }));
        this.expressEntity.use((0, cors_1.default)());
        this.expressEntity.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.expressEntity.engine('html', ejs_1.default.renderFile);
        this.expressEntity.set('view engine', 'html');
        this.expressEntity.set('view engine', 'ejs');
        this.expressEntity.use(express_1.default.static(`${__dirname}/public`));
    }
    routes() {
        this.expressEntity.use(routes_1.routes);
    }
}
exports.default = Server;
