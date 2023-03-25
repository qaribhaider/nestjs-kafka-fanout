# Kafka Fan-out with NestJS

A sample application showcasing Apache Kafka fan-out approach, the web services are based on NestJS. Multiple consumer groups have been used to ensure messages are spread to all the consumers.

## Install & Run

App requires [NestJS](https://nestjs.com/) and [Docker](https://www.docker.com/) to run. It is recommended to have NestJS globally installed to create additional web services.

1- Install the dependencies for each web service, e.g.

```sh
cd apps/api-gateway
yarn install
```

2- Create and run kafka service using docker

```sh
cd services/kafka
docker-compose up
```

3- Run each service once Kafka is up, starting with the `api-gateway`

```sh
cd apps/api-gateway
yarn start:dev
```

4- Access the services at following endpoints:
| Endpoint | Details | Amends |
| ------ | ------ | ------ |
| http://localhost:8080/ | Kafka UI | To amend the default port look into `services/kafka/docker-compose.yml` |
| http://localhost:3000/ | API gateyway service | To amend the default port look into `apps/api-gateway/src/main.ts` |
| http://localhost:3000/kafka-test | API gateyway endpoint to produce a new message | To amend the route look into `apps/api-gateway/src/app.controller.ts` |

## Directory structure

**/services/kafka**
Contains the docker compose file to setup Kafka service. The `init-kafka` service within the docker config creates a Kafka topic `topic_01`

**/apps/**
Has all the applications / web-services

**/apps/api-gateway/**
API gateyway is created as the main entry point for the application, which produces messages, that are then consumed by rest of the web-services.

**/apps/crm/**
Sample web-service to consume messages, consumed messages are rendered on the console

**/apps/mailer/**
Sample web-service to consume messages, consumed messages are logged to the console
