import { io } from 'socket.io-client'
import { BASE_URL } from '../../config'

const joinedRooms = new Set()

const socket = io(BASE_URL, {
  withCredentials: true,
  path: '/ws',

  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1_000,
  reconnectionDelayMax: 30_000,
  randomizationFactor: 0.3,
})

socket.on('connect', () => {
  console.log('Connected to WebSocket server')
  joinedRooms.forEach((room) => {
    socket.emit('join', { room })
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server')
})

export function joinRoom(room) {
  joinedRooms.add(room)
  socket.emit('join', { room })
}

export function leaveRoom(room) {
  joinedRooms.delete(room)
  socket.emit('leave', { room })
}

export default socket
