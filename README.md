# Exercise React

Run the server with

```bash
yarn install
yarn tsc
yarn start
```

Then run the client

```bash
yarn client:start
```

The server part of this system is already designed and exposes a set of REST endpoints via the `/api` route and a GraphQL endpoint.

The client has been setup to consume graphql if you chose to use that instead.

## Task

Build 3 views

- A dashboard with stats and the trips listed in a table.
- A drivers' master-detail page
- A trip page to show the detail for a single trip

Endpoints

```
GET all Trips : http://localhost:3005/api/trips

GET trip by ID : http://localhost:3005/api/trips/:tripID

GET drivers : http://localhost:3005/api/drivers

GET drivers by ID : http://localhost:3005/api/drivers/:driverID

GET Vehicle by ID : http://localhost:3005/api/vehicle/:vehicleID

GET stats : http://localhost:3005/api/stats
```

## A sample can be found on https://driver-report-dashboard.herokuapp.com/
