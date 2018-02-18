# OpenCollab Frontend

Electron app frontend for the `OpenCollab` protocol.

# Install

Two dependencies are currently needed to use the frontend: [TestRPC](https://github.com/ethereumjs/testrpc) for testing purpose and [git-remote-mango](https://github.com/macor161/git-mango-helper) to handle the `mango://` protocol. Then run `npm install`.

```
npm install -g ethereumjs-testrpc git-mango-helper
npm install
```

# Usage 

Make sure `TestRPC` is running. Gas usage has not been addressed so it is likely necessary to run TestRPC with a high gas limit.

```
testrpc -l 1000000000
```

To enable hot reload run:

```
npm run hot
```
And to start the electron app:

```
npm run dev
```