# webhooks_microservice
The webhooks microservice is made using <strong>Moleculer</Strong> and the backend is made using <strong>Express</strong>
The API's can be tested here ![https://dytetask.herokuapp.com](https://dytetask.herokuapp.com)

## API Endpoints

| URI | Description |Authorization Required|
| --- | --- | --- |
| POST /api/auth/login | List posts (with search and pagination) | No |
| POST /api/auth/signup | List posts (with search and pagination) | No |
| POST /ip/webhook/webhook | Create Webhook | Yes (Role:admin) |
| GET /ip/webhook/webhook | List all webhooks | Yes (Role:admin) |
| PUT /ip/webhook/webhook | Update one webhook | Yes (Role:admin) |
| DELETE /ip/webhook/webhook | Delete Webhook | Yes (Role:admin) |
| POST /ip/webhook | trigger webhook | Yes (Role:admin) |

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
#(docker is configured if required)
```


## Authentication

You need to pass the `Authorization` header with `Bearer {SERVER_SECRET}`.

## Body (To be sent as JSON body)
### POST /api/auth/signup
  {
    "username":"user89",
    "password":"123456",
    "role":"admin"
  }
  
### POST /api/auth/login
  {
    "username":"user89",
    "password":"123456",
  }
  
### POST /ip/webhook/webhook
  {
    "targetUrl":"https://eehl21ssuvns4z2.m.pipedream.net"
  }
  
### GET /ip/webhook/webhook
  {
    
  }

### PUT /ip/webhook/webhook
  {   
    "id": "60f2d205799d7434a672c099",
    "newTargetUrl":"https://eehl21ssuvns.m.pipedream.net"
  }

### DELETE /ip/webhook/webhook
  {
    "id": "60f2d205799d7434a672c099",
  }

### POST /ip/webhook
  {
    "ipAddress": "127.0.0.1",
  }
  ### Note: The trigger API causes the hosted backend to crash, hence not deployed the route /ip/webhook
