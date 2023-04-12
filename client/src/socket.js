import { Server } from "socket.io";
import { createServer } from 'http'

const httpServer = createServer()
const obj = { true: 1, false: 1 }

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {

  setInterval(() => {
    // console.log(Math.random() < 0.5);
    const betValue = Math.random() < 0.5
    if (!obj[betValue]) obj[betValue] = 1; else obj[betValue] = obj[betValue] + 1;

    console.log(obj)
    socket.emit('welcome', obj)

  }, 2000);

  // socket.emit('welcome', 'welcome to PeerMarket')


  socket.on('msg', (data) => {
    console.log('msg from client =>', data)
  })
})

httpServer.listen(3001, () => {
  console.log(`http server listening on port:3001`)
})