import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: String,
  url: String,
  repo: String,
  tags: [String],
  cover: String,
  createdAt: {type:Date, default:Date.now}
})

export default mongoose.model('Project', ProjectSchema)
