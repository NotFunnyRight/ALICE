const http = require("http");

const PORT = process.env.PORT || 17722;

// ---------------------------------------------
function onClientRequest(request, response) {
  response.writeHead(200);
  response.end();
}

let server = http.createServer(onClientRequest);
server.listen(PORT);

console.log("Server started listening in " + PORT);
function onClientRequest(request, response) {
  response.writeHead(200);

  console.log(request.method);

  console.log(request.url);

  console.log("===============================");

  response.end();
}
