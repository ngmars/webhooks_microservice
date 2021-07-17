# webhooks_microservice
The webhooks microservice is made using Moleculer and the backend is made using Express

## API Endpoints

| URI | Description |Authorization Required|
| --- | --- | --- |
| POST /api/auth/login | List posts (with search and pagination) | No |
| POST /api/auth/signup | List posts (with search and pagination) | No |
| GET /ip/webhook/webhook | List all webhooks | Yes (Role:admin) |
| PUT /ip/webhook/webhook | Update one webhook | Yes (Role:admin) |
| POST /ip/webhook/webhook | Create Webhook | Yes (Role:admin) |
| DELETE /ip/webhook/webhook | Delete Webhook | Yes (Role:admin) |

## Setup

### Requirements

* Docker
* Docker compose
* NodeJS
* Yarn

### Run locally

Execute this commands

```shell
git clone https://github.com/ngmars/webhooks_microservice.git
cd webhooks_microservice/mcr-wb
npm install
npm run dev
(docker is configured if required)
```


## Authentication

You need to pass the `Authorization` header with `Bearer {SERVER_SECRET}`.

