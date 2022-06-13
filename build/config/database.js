"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { MONGODB_USER, MONGODB_PASSWORD, DB_HOST, MONGODB_DOCKER_PORT, MONGODB_DATABASE, } = process.env;
let finalPortDocker = MONGODB_DOCKER_PORT || '27017';
if (process.env.TS_NODE_DEV) {
    finalPortDocker = '7017';
}
exports.default = {
    url: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${DB_HOST}:${finalPortDocker}/${MONGODB_DATABASE}?authSource=admin`
};
