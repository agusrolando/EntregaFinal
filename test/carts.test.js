import mongoose from "mongoose";
import chai from "chai";
import config from "../src/config/config.js";
import Cart from "../src/dao/mongo/carts.mongo.js";

mongoose.connect(config.TEST_MONGO_URI);
const expect = chai.expect;

describe("Testeando el Dao: Carritos", () => {
    before(function() {
        this.cartsDao = new Cart()
    })

    beforeEach(function() {
        mongoose.connection.collections.carts.drop()
        this.timeout(5000)
    })

    it("DAO: No hay hay ningun carrito creado previamente", async function() {
        const cart = await this.cartsDao.get()
        expect(cart).to.be.deep.equal([])
    })

    it("DAO: Se crea carrito con propiedad products y es un array vacio por defecto", async function() {
        const cart = await this.cartsDao.create()
        expect(cart._id).to.be.ok
        expect(cart.products).to.be.deep.equal([])
    })

    it("DAO: Se obtiene un carrito por su ID", async function() {
        const cart = await this.cartsDao.create()
        const foundCart = await this.cartsDao.getById(cart._id)

        expect(foundCart._id).to.be.ok
        expect(foundCart.products).to.be.an("array")
    })

    it("DAO: Viene todos los carritos creados", async function() {
        const cart = await this.cartsDao.get()
        expect(cart).to.be.deep.an("array")
    })
})