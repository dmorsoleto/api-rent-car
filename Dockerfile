FROM node:current-alpine3.15
WORKDIR /app
RUN apk add python3 && apk add py3-pip
RUN apk add --update alpine-sdk && \
    apk add libffi-dev openssl-dev
COPY . .
RUN python3 -m pip install -r requirements.txt
COPY package.json .
RUN yarn install
CMD ["yarn", "start"]