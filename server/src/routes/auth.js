import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const r = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

r.post('/register', async (req,res)=>{
  try{
    const { username, password } = req.body
    if(!username || !password) return res.status(400).json({error:'Missing'})
    const existing = await User.findOne({ username })
    if(existing) return res.status(400).json({error:'User exists'})
    const hash = await bcrypt.hash(password, 10)
    const u = await User.create({ username, passwordHash: hash })
    res.json({ ok:true, id: u._id })
  }catch(e){ console.error(e); res.status(500).json({error:'Server error'}) }
})

r.post('/login', async (req,res)=>{
  try{
    const { username, password } = req.body
    if(!username||!password) return res.status(400).json({error:'Missing'})
    const u = await User.findOne({ username })
    if(!u) return res.status(400).json({error:'Invalid'})
    const ok = await bcrypt.compare(password, u.passwordHash)
    if(!ok) return res.status(400).json({error:'Invalid'})
    const token = jwt.sign({ id: u._id, username: u.username }, JWT_SECRET, { expiresIn: '12h' })
    res.json({ ok:true, token })
  }catch(e){ console.error(e); res.status(500).json({error:'Server error'}) }
})

export default r
