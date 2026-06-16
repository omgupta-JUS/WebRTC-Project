# WebRTC-Project

#  WEBSOCKETS

- Problem in client server arch is after one req connection gets closed and one of the solution for that is polling basically if we need continous response from server then client continously ping the server for updates then server response but problem here is connection needs to restart after every ping, and polling leads to resource constraint and not really real time

- so in websocket we dont close the connection basically it starts when client sents a req to server with a message header of upgrade into websockets then our HTTP (thru which client sent req) upgrade to websockets

- JS is inside the frontend files too like in HTML for:
- clicks - if someone click x then what to do logic is written in JS in frontend file
- showing data on screen 
- form validation like password lenth should be greater than 8, etc.
- WebSocket client
- fetching data


- in this index.js is acting as client and server.js as server

# Scaling of websockets

- http is a stateless connection -> where we dont use memeort continously we release it once req, res done while websockets are stateful means memory is occupied by it continously.

- HORIZONTAL SCALING
we can't scale running server vertically, while not same with horizontal scaling. like if one server running on 9000 and another on 9001 then this is scaling horizontally! 
- but the problem is different cant communicate with each other we need some relay server to connect different servers with same websocket connection
