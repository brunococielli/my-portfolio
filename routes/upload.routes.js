import express from "express"
import fs from "fs"
import path from "path"

import prisma from "../project-2/db.js"
import { upload } from "../project-2/upload.js"
import { authMiddleware } from "../project-2/middleware/authMiddleware.js"

const router = express.Router()

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" })

    const imagePath = `/project-2/uploads/${req.file.filename}`

    await prisma.user.update({
      where: { id: req.user.id },
      data: { images: { push: imagePath } }
    })

    res.json({ message: "Image uploaded", image: imagePath })
  }
)

router.delete("/deleteImage", authMiddleware, async (req, res) => {
  const { src } = req.body
  if (!src) return res.status(400).json({ error: "Missing image src" })

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { images: true }
  })

  if (!user || !user.images.includes(src))
    return res.status(403).json({ error: "Not allowed" })

  const filename = path.basename(src)
  const filePath = path.join(
    process.cwd(),
    "project-2",
    "uploads",
    filename
  )

  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      images: {
        set: user.images.filter(img => img !== src)
      }
    }
  })

  res.json({ message: "Image deleted" })
})

router.get("/sendImages", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { images: true }
  })

  res.json(user.images)
})

export default router