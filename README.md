# jaeger-sample-app-node

Sample instrumentation in NodeJS

## usage

### Run the stack

`docker-compose up -d`

### Run the Sample App

`cd app && node app-server.js`

* Make ping request:

`curl localhost:3000/internal/ping`

* Make hello request:

`curl localhost:3000/internal/hello`

* Make default path request:

`curl localhost:3000`

### See tracing

Open the Jaeger UI and see the tracings (http://localhost:16686/)[http://localhost:16686/]
