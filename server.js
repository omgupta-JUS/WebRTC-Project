// defualt or built in module http in node
import http from 'node:http';

import path from 'path';
 
// reads html file
import fs from 'node:fs/promises'

import { WebSocketServer } from 'ws';

// important redis methods
import { redisPublish, redisSuscribe } from './connection.js';

// if not in env then defualt is 9000
const PORT = process.env.PORT ?? 9000;
const REDIS_CHANNEL = 'ws-messages';

// this is how to create a server in node
const httpserver = http.createServer(
    async function(req, res) {
        // when someone visits out http server
        const indexfile = await fs.readFile(path.resolve('./index.html'), 'utf-8')
        // setting header inside response
        res.setHeader('Content-Type', 'text/html');
        return res.end(indexfile);
    }
);


const wsServer = new WebSocketServer({
    server : httpserver
});

// creating web socket server when frontend sends upgrade req to backend then this take care of upgradation
wsServer.on('connection', (websocket) => {
    console.log(`websocket connection started`);

    // if get message on websocket connection then we will print
    websocket.on('message', async (data) => {
        console.log(`message recieved: `, data.toString());
        /* same message sending to client who sent this message => POV: usko bhi to dikhna chaiye ki usne kya bheja hai
        websocket.send(data.toString());
        */

        // now sending to all connected clients by looping it over basically broadcast all connected
        // wsServer.clients.forEach(client => {
        //     client.send(data.toString());
        // })

        //  NOW WE ARE ESTABLISHING WS CONNECTION WITH redis thru websocket -> we always relay to channel here it is ws-messages
        await redisPublish.publish(REDIS_CHANNEL, data.toString());
    });
});
 
// now redis subscribing and when redis gets message then send it all servers(for redis these will be clients) it is connected with
redisSuscribe.subscribe(REDIS_CHANNEL)
redisSuscribe.on('message', (channel, message) => {
    // becoz there could be multiple channels for multiple redis brokers
    if(channel==REDIS_CHANNEL){
        wsServer.clients.forEach(client => {
            client.send(message.toString());
        })
    }
})



// in listening state
httpserver.listen(PORT, () => {
    console.log(`server is listening on http:localhost:${PORT}`)
});