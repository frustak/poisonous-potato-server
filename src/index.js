const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const userRouter = require('./routers/user');
const messageRouter = require('./routers/message');
const Message = require('./models/message');
require('./db/mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 4000;

const corsOptions = { origin: 'http://localhost:3000' };
app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

io.on('connection', socket => {
  socket.on('message', async (text, owner) => {
    
    const message = new Message({ text, owner });
    await message.save();
    io.emit('message', message);
  });
});

server.listen(port, () => console.log('Server is running on port 4000'));
