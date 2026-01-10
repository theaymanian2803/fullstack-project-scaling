import serverless from 'serverless-http'
import app from '../../backend/server.js' // This points to your file above

export const handler = serverless(app)
