import { Router } from "express"
import { faker } from "../controllers/product.controlers.js"

const router = Router()

router.get("/", faker)

export default router