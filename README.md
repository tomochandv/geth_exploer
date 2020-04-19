# Private network exploer

## this

Block data is stored in the Mongolia DB from the beginning.
Start a site with MongoDB using Docker.

## config.js
```
const config = {
  geth: {
    dev: 'developer server geth url',
    local: 'local server geth url',
    production: 'production server geth url',
  },
  mongodb: {
    dev: 'mongodb://localhost:27017',
    local: 'mongodb://mongodb:27017',
    production: 'mongodb://localhost:27017',
  },
}
```

## start
docker-compose -f docker-compose-dev.yaml up --build