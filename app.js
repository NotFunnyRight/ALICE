const http = require("http");

const PORT = process.env.PORT || 17722;

function getURLParams(req) {
    const baseURL = 'http://' + req.headers.host;
    const reqUrl  = new URL(req.url, baseURL);
   
    return {
        baseURL,
        reqUrl,
        path    :  reqUrl.pathname,
    };
}

function collectBodyData(req) {
    let body = "";

    return new Promise((resolve) => {
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                resolve({});
            }
        });
    });
}

async function onClientRequest(req, res) {
    const { path, reqUrl } = getURLParams(req);

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {

        if (path === '/' || path === '') {
            
            if (reqUrl.searchParams.get('message') === 'message') {
                return res.end(
                    JSON.stringify({ msg: "Hello, How are you?" })
                );
            }

            return res.end(
                JSON.stringify({ msg: "Hello" })
            );
        }

        res.statusCode = 404;
        return res.end(JSON.stringify({ error: "Not Found" }));
    }

    if (req.method === 'POST' && path === '/api/sayhi') {

        const body = await collectBodyData(req);
        const name = body.name || "";

        return res.end(
            JSON.stringify({ msg: `Hello ${name}, How are you?` })
        );
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
}

const server = http.createServer(onClientRequest);

server.listen(PORT, () => {
    console.log('Server started listening on port ' + PORT);
});
