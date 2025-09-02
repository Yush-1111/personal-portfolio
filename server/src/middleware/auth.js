import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'
export default function(req,res,next){
  const auth = req.headers.authorization
  if(!auth) return res.status(401).json({error:'Missing auth'})
  const parts = auth.split(' ')
  if(parts.length !== 2) return res.status(401).json({error:'Invalid auth'})
  const token = parts[1]
  try{
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data
    next()
  }catch(e){ return res.status(401).json({error:'Invalid token'}) }
}
