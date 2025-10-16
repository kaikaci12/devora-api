import e from "express"
import dotenv from "dotenv"
import { userRouter } from "./routes/router.js"
import cors from "cors"
import appendColumns from "./services/google_sheets/google_sheets.service.js"

dotenv.config()

const app = e()
const PORT = process.env.PORT || 3000
app.use(e.json())
app.use(cors({
    allowedOrigins: ["http://localhost:3000", "https://devora.ge", "https://www.devora.ge"]
}))

app.use("/api/users", userRouter)
app.get("/", (req, res) => {
    res.json({message: "Welcome to Devora Backend"})
})
import { startBot } from "./bot/bot.js";

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    // Start the Discord bot if configured
    await startBot();
})

