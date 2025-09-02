import { Router } from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const r = Router();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ uploads folder ka proper path banaya
const uploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, name);
  },
});

const uploader = multer({ storage });

// List (admin - read only)
r.get("/projects", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ ok: true, projects });
});

// Upload image
r.post("/upload", auth, uploader.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const url = "/uploads/" + req.file.filename;
  res.json({ ok: true, url });
});

// Create
r.post("/projects", auth, async (req, res) => {
  try {
    const { title, description, url, repo, tags, cover } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });
    const p = await Project.create({ title, description, url, repo, tags, cover });
    res.json({ ok: true, project: p });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Update
r.put("/projects/:id", auth, async (req, res) => {
  try {
    const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ ok: true, project: p });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete
r.delete("/projects/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default r;
