import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import "dotenv/config"

import authRoutes from "./routes/auth.routes.js"
import uploadRoutes from "./routes/upload.routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

app.use("/", express.static(path.join(__dirname, "portfolio")))
app.use(
  "/project-2",
  express.static(path.join(__dirname, "project-2", "public"))
)
app.use(
  "/project-3",
  express.static(path.join(__dirname, "project-3", "public"))
)
app.use(
  "/project-2/uploads",
  express.static(path.join(__dirname, "project-2", "uploads"))
)
app.use("/assets", express.static(path.join(__dirname, "project-3", "assets")))

app.use("/", authRoutes)
app.use("/", uploadRoutes)

app.listen(3000, () => {
  console.log("server is listening on port 3000!")
})