import pika, os, logging, sys
logging.basicConfig()
from database import get_database
from dotenv import load_dotenv
from utils import getEnvironment

load_dotenv()

RABBITMQ_URL = os.getenv('RABBITMQ_DOCKER_URL')
if(getEnvironment() == 'development'):
    RABBITMQ_URL = os.getenv('RABBITMQ_LOCAL_URL')

print('RABBITMQ_URL',RABBITMQ_URL)
url = os.environ.get('CLOUDAMQP_URL', RABBITMQ_URL)


while(True):
    try:
        print("Connecting...")
        params = pika.URLParameters(url)
        connection = pika.BlockingConnection(params)
        channel = connection.channel() # start a channel
        channel.queue_declare(queue='user.rent_active', durable=True) # Declare a queue

        # create a function which is called on incoming messages
        def callback(ch, method, properties, body):
          get_database(body)

        # set up subscription on the queue
        channel.basic_consume('user.rent_active',
          callback,
          auto_ack=True)

        try:
            print("Connected...")
            channel.start_consuming()
        except KeyboardInterrupt:
            channel.stop_consuming()
            connection.close()
            break
    except pika.exceptions.ConnectionClosedByBroker:
        continue
    except pika.exceptions.AMQPChannelError as err:
        print("Caught a channel error: {}, stopping...".format(err))
        break
    except pika.exceptions.AMQPConnectionError:
        print("Connection was closed, retrying...")
        continue