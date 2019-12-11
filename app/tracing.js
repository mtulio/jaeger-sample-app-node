const { initTracer: initJaegerTracer } = require("jaeger-client");

// agent (default):
ingestUrl = 'localhost6832'
// collector:
// ingestUrl = 'http://localhost:14268/api/traces'

module.exports.initTracer = serviceName => {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: true,
      collectorEndpoint: ingestUrl,
    },
  };
  const options = {
    logger: {
      info(msg) {
        console.log("INFO ", msg);
      },
      error(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};
