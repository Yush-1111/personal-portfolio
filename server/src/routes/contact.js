import { Router } from 'express'
import Lead from '../models/Lead.js'
const r = Router()
r.post('/', async (req,res)=>{
  try{
    const {name,email,message} = req.body
    if(!name||!email||!message) return res.status(400).json({error:'All fields required'})
    const lead = await Lead.create({name,email,message})
    res.json({ok:true,id:lead._id})
  }catch(e){ console.error(e); res.status(500).json({error:'Server error'}) }
})
export default r
