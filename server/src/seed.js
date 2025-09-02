import mongoose from 'mongoose'
import Project from './models/Project.js'
import 'dotenv/config'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stellar_portfolio_admin'
async function run(){ await mongoose.connect(MONGODB_URI); await Project.deleteMany({}); await Project.insertMany([
  {title:'Interactive 3D Gallery', description:'R3F horizontal gallery with shader highlights', tags:['R3F','Shaders'], url:'#', repo:'#'},
  {title:'Analytics Dashboard', description:'Realtime widgets and clean UX', tags:['React','Charts'], url:'#', repo:'#'}
]); console.log('seeded'); process.exit(0) }
run().catch(e=>{console.error(e); process.exit(1)})
