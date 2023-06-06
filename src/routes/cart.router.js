import { Router } from "express"
import { authorization, passportCall } from "../utils.js"
import { 
    Pagar, 
    addCart, 
    addProdToCart, 
    allCarts, 
    approved, 
    cambiarCantidadProd, 
    cartID, 
    changeAllProds, 
    deleteAllProdInCart, 
    deleteProdInCart, 
    finalizarCompra, 
    purchase 
} from "../controllers/cart.controlers.js";

const router = Router()

router.get("/", allCarts)

router.get("/purchase", purchase)

router.get("/approved", passportCall("jwt"), approved)

router.get("/:id", cartID)

router.post("/", authorization('user'), addCart)

router.post("/pagar", Pagar)

router.post("/:cid/product/:pid", addProdToCart)

router.post("/:cid/purchase", passportCall('jwt'), finalizarCompra)

router.delete("/:cid/product/:pid", deleteProdInCart)

router.delete("/:cid", authorization('admin'), deleteAllProdInCart)

router.put("/:cid/product/:pid", authorization('admin'), cambiarCantidadProd)

router.put("/:cid", authorization('admin'), changeAllProds)

export default router