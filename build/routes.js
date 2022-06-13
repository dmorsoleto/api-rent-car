"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
exports.routes = routes;
const routes_1 = __importDefault(require("./Adms/routes"));
const routes_2 = __importDefault(require("./Auth/routes"));
const routes_3 = __importDefault(require("./Cars/routes"));
const routes_4 = __importDefault(require("./Messages/routes"));
const routes_5 = __importDefault(require("./Rents/routes"));
const routes_6 = __importDefault(require("./Users/routes"));
routes.get('/', (request, response) => {
    return response.json({ 'error': 1 });
});
routes.get("/api/documentation", function (req, res) {
    res.sendFile(`${__dirname}/public/api-doc/index.html`);
});
new routes_3.default(routes);
new routes_6.default(routes);
new routes_5.default(routes);
new routes_4.default(routes);
new routes_1.default(routes);
new routes_2.default(routes);
