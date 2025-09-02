import { Router } from 'express'
import Project from '../models/Project.js'
const r = Router()
// Public list
r.get('/', async (req,res)=>{ const projects = await Project.find().sort({createdAt:-1}).limit(50); res.json({ok:true,projects}) })
export default r
