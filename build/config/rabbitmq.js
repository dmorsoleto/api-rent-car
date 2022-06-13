"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
let amqpUrl = process.env.RABBITMQ_DOCKER_URL || 'amqp://localhost:15672';
if (process.env.TS_NODE_DEV || process.env.NODE_ENV === 'test') {
    amqpUrl = process.env.RABBITMQ_LOCAL_URL || 'amqp://localhost:5672';
}
class RabbitMQ {
    async sendMessage(objSend) {
        const objCon = await this.getConnection();
        try {
            await objCon.channel.assertExchange(objSend.exchange, 'direct', { durable: true });
            await objCon.channel.assertQueue(objSend.queue, { durable: true, exclusive: false, autoDelete: false, arguments: null });
            await objCon.channel.bindQueue(objSend.queue, objSend.exchange, objSend.routingKey);
            const msg = Object.assign({}, objSend.message);
            objCon.channel.publish(objSend.exchange, objSend.routingKey, Buffer.from(JSON.stringify(msg)));
            console.log('Message published');
        }
        catch (e) {
            console.error('Error in publishing message', e);
        }
        finally {
            console.info('Closing channel and connection if available');
            setTimeout(async () => {
                await objCon.channel.close();
                await objCon.connection.close();
            }, 500);
            console.info('Channel and connection closed');
        }
    }
    async getConnection() {
        console.log('amqpUrl', amqpUrl);
        const connection = await amqplib_1.default.connect(amqpUrl, 'heartbeat=60');
        const channel = await connection.createChannel();
        return {
            connection,
            channel
        };
    }
}
exports.default = RabbitMQ;
