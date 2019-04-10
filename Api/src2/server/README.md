# Demo Server

Execute this server on your domain.
It listens for HTTP POST requests on the route `/data`.
If a request was received, the server invokes the action by the token which was passed in the body.

To open a server, the [express module](https://github.com/expressjs/express) is used.

To send reqeusts, the [axios module](https://github.com/axios/axios) is used.
