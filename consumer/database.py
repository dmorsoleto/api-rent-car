import os
from dotenv import load_dotenv
import json
from utils import getEnvironment

load_dotenv()

MONGODB_USER = os.getenv('MONGODB_USER')
MONGODB_PASSWORD = os.getenv('MONGODB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
MONGODB_DATABASE = os.getenv('MONGODB_DATABASE')
MONGODB_DOCKER_PORT = os.getenv('MONGODB_DOCKER_PORT')
MONGODB_LOCAL_PORT = os.getenv('MONGODB_LOCAL_PORT')

MONGODB_FINAL_PORT = MONGODB_DOCKER_PORT

if(getEnvironment() == 'development'):
    MONGODB_FINAL_PORT = MONGODB_LOCAL_PORT

def get_database(body):

    try:
        from pymongo import MongoClient

        CONNECTION_STRING = "mongodb://"+MONGODB_USER+":"+MONGODB_PASSWORD+"@"+DB_HOST+":"+MONGODB_FINAL_PORT+"/"+MONGODB_DATABASE+"?authSource=admin"

        client = MongoClient(CONNECTION_STRING)
        bd = client[MONGODB_DATABASE]
        
        bodyObj = json.loads(body)
        bd['messages'].insert_one({
            'uuid': bodyObj["id"],
            'name': bodyObj["name"],
            'email': bodyObj["email"],
            'days': bodyObj["daysLeft"]
        })
    except:
        print("Ocorreu um erro com o banco de dados")