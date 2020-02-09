const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

const port = 9966

server.listen(port, err => {
  if (err) throw err
  console.log('server is runing at port ' + port)
})

const colorData = [
  ['red', 'blue', 'cyan', 'green'],
  ['red', 'blue', 'cyan', 'green'],
  ['red', 'blue', 'cyan', 'green'],
  ['red', 'blue', 'cyan', 'green']
]

io.on('connection', socket => {
  socket.emit('get color data', colorData)
  socket.on('update grid color', ({ row, col, color }) => {
    colorData[row][col] = color
    // 更改颜色,广播所有用户更新
    socket.broadcast.emit('get color data', colorData)
    socket.emit('get color data', colorData)
  })
})
