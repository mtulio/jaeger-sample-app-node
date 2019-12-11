var
	express = require('express');
	app = express();
	fs = require('fs');
	args_cli = {}
	args = {}
	config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const { initTracer } = require("./tracing");
    const tracer = initTracer("jaeger-sample-app-node");

// Vars
process.argv.forEach(function (val, index, array) {
  if (index % 2 == 0) {
    //console.log(index + ': ' + val);
    args_cli[val] = process.argv[index+1]
  }
});

args_app = {
    "name": args_cli['--name'] || 'nodejs-server',
	"port": args_cli['--production.port'] || 3000,
	"env": args_cli['--environment'] || 'dev'
}

// Server
//> handlers
app.get('/', function (req, res) {
    const span = tracer.startSpan("GET /");
    d = Date.now() || 0
    resPayload = '{"timestamp": '+ d + ',"version": "'+ config.version +'"}'
    
    res.send(resPayload);
    span.log({ res: resPayload });
    span.finish();
});

app.get('/internal/hello', function (req, res) {
    const span = tracer.startSpan("GET /internal/hello");
    resPayload = '{"Hello_Node": '+ args_app.port +'}'
    
    res.send(resPayload);
    span.log({ res: resPayload });
    span.finish();
});

app.get('/internal/ping', function (req, res) {
    const span = tracer.startSpan("GET /internal/ping");
    resPayload = '{"response": "pong"}'

    res.send(resPayload);
    span.log({ res: resPayload });
    span.finish();
});

//> Bind && listen
app.listen(args_app.port, function () {
    console.log('Sample App using env ' + args_app.env + ' listening on port ', args_app.port);
});

