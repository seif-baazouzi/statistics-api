# Statistics REST API

This is an API where the user can create an account and add collections were each collection has logs and getting weekly, monthly and yearly statistics from the logs.

# Quick Start

```console
$ npm i
$ npm run dev
```

# Routes

### Auth routes

- GET  /auth
- POST /login  [ email, password ]
- POST /signup [ name, email, password ]

### Collections Routes

This Routes requite X-Auth-Token header

- GET    /collections/:collectionName
- POST   /collections                 [ collectionName ]
- POST   /collections/:collectionName [ newCollectionName ]
- DELETE /collections/:collectionName

### Logs Routes

This Routes requite X-Auth-Token header

- GET    /logs/:collectionName
- POST   /logs/:collectionName            [ label, value ]
- POST   /logs/:collectionName/:logID     [ label, value ]
- DELETE /logs/:collectionName/:logID

### Statistics Routes

This Routes requite X-Auth-Token header

- GET /statistics/:collectionName/weakly
- GET /statistics/:collectionName/monthly
- GET /statistics/:collectionName/yearly
