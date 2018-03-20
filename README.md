# OpenCollab Frontend

Electron app frontend for the `OpenCollab` protocol.

# Install

Three dependencies are currently needed to use the frontend: 
* [TestRPC](https://github.com/ethereumjs/testrpc) for the Ethereum RPC client
* [ipfs](https://www.npmjs.com/package/ipfs) for the IPFS node
* [opencollab-cli](https://github.com/macor161/opencollab-cli) to handle the `mango://` protocol. 

Then run `npm install`.

```
npm install -g ethereumjs-testrpc ipfs opencollab-cli
npm install
```

# Usage 

Make sure `TestRPC` is running. Gas usage has not been addressed so it is likely necessary to run TestRPC with a high gas limit.

```
testrpc -l 1000000000
```

Start the IPFS node:

```
jsipfs daemon
```

To enable hot reload run:

```
npm run hot
```
And to start the electron app:

```
npm run dev
```