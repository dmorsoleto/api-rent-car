import sys

def getEnvironment():
    env = 'production'
    if(len(sys.argv) > 2):
        env = sys.argv[2]
    return env