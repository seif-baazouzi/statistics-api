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

- GET    /collections/:collectionID
- POST   /collections                 [ collectionName ]
- POST   /collections/:collectionID   [ newCollectionName ]
- DELETE /collections/:collectionID

### Logs Routes

This Routes requite X-Auth-Token header

- GET    /logs/:collectionID
- POST   /logs/:collectionID            [ label, value ]
- POST   /logs/:collectionID/:logID     [ label, value ]
- DELETE /logs/:collectionID/:logID

### Statistics Routes

This Routes requite X-Auth-Token header

- GET /statistics/weekly/:collectionID/:date
- GET /statistics/monthly/:collectionID/:date
- GET /statistics/yearly/:collectionID/:date
