import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { generateSTL } from './stl/generator'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const server = fastify({
  logger: true
})

// Register plugins
server.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
})

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required')
}

server.register(jwt, {
  secret: jwtSecret,
  verify: {
    maxAge: '1h'
  }
})

// Auth hook
server.addHook('onRequest', async (request, reply) => {
  try {
    const authHeader = request.headers.authorization
    console.log('Received Auth Header:', authHeader)
    
    if (!authHeader) {
      console.log('No auth header present')
      return reply.status(401).send({ error: 'No authorization header' })
    }

    const token = authHeader.replace('Bearer ', '')
    console.log('Token:', token)

    const decoded = await request.jwtVerify()
    console.log('JWT Verification successful:', decoded)
  } catch (err) {
    console.error('JWT Verification failed:', err)
    return reply.status(401).send({ error: 'Unauthorized' })
  }
})

// STL route
server.get('/api/stl/:projectId', async (request, reply) => {
  const { projectId } = request.params as { projectId: string }
  
  try {
    // Generate STL file (placeholder for now)
    const stlContent = await generateSTL(projectId)
    
    // Set headers for STL file
    reply.header('Content-Type', 'application/sla')
    reply.header('Content-Disposition', `attachment; filename="${projectId}.stl"`)
    
    return reply.send(stlContent)
  } catch (error) {
    server.log.debug("Error generating STL file")
    server.log.error(error)
    return reply.status(500).send({ error: 'Failed to generate STL file' })
  }
})

const start = async () => {
  try {
    await server.listen({ 
      port: Number(process.env.PORT) || 3001,
      host: '0.0.0.0'
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start() 