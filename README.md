# webhooks_microservice
The webhooks microservice is made using <strong>Moleculer</Strong> and the backend is made using <strong>Express</strong>
The API's can be tested by appending the endpoint to https://dytetask.herokuapp.com 

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
### POST /api/auth/signup<br/>
  {<br/>
    "username":"user89",<br/>
    "password":"123456",<br/>
    "role":"admin"<br/>
  }<br/>
  
### POST /api/auth/login<br/>
  {<br/>
    "username":"user89",<br/>
    "password":"123456",<br/>
  }<br/>
  
### POST /ip/webhook/webhook<br/>
  {<br/>
    "targetUrl":"https://eehl21ssuvns4z2.m.pipedream.net"<br/>
  }<br/>
  
### GET /ip/webhook/webhook<br/>
  {<br/>
    <br/>
  }<br/>

### PUT /ip/webhook/webhook<br/>
  {   <br/>
    "id": "60f2d205799d7434a672c099",<br/>
    "newTargetUrl":"https://eehl21ssuvns.m.pipedream.net"<br/>
  }<br/>

### DELETE /ip/webhook/webhook<br/>
  {<br/>
    "id": "60f2d205799d7434a672c099",<br/>
  }<br/>

### POST /ip/webhook<br/>
  {<br/>
    "ipAddress": "127.0.0.1",<br/>
  }<br/>
  ### Note: The trigger API causes the hosted backend to crash, hence not deployed the route /ip/webhook<br/>
