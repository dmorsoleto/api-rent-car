# Rental Cars
## Author - Daniel Morsoleto

API para teste da Arizona / Visto

## Tech

- [NodeJS] - Backend
- [MongoDB] - Database
- Docker

## Installation

Instalar dependências:
```sh
yarn install
```

Rodar docker-compose.yml up. 
Qualquer update no código rodar.
```sh
yarn build
```
E reiniciar container.

## Acesso
http://localhost:3000/

## Documentação API
http://localhost:3000/api/documentation

## Gerar Token JWT
Acessar a rota Auth da documentação e inserir o login previamente cadastrado:
user: admin
password: 123456

## Para atualizações no código surtirem efeito
```sh
yarn build
```
Rodar docker-compose.yml up. 

## Run Pipeline and Build Image

Dar um merge ou subir alterações na branch "deploy" aciona a pipeline