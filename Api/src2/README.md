# Endpoint API Exapmle

The shown action creates a Bearer Token when invoked and sends it to a given server. As an examlple, the source code for such a server can be found in `server/`.

The flow is as following:

1. The action gets called via any invoker, except `endpoint`
2. The action creates a Bearer Token and sends it to the server as described in `server/` via an POST request of the mydaco Api interface
3. The server waits one minute and then invokes the action via the public api with the prior generated Bearer Token
