import mongoose from "mongoose";
import chai from "chai";
import config from "../src/config/config.js";
import Product from "../src/dao/mongo/products.mongo.js";


mongoose.connect(config.TEST_MONGO_URI);
const expect = chai.expect;

describe("Testeando el Dao: Productos", () => {
    before(function() {
        this.productsDao = new Product()
    })

    beforeEach(function() {
        mongoose.connection.collections.products.drop()
        this.timeout(5000)
    })

    it("DAO: Todos los porductos llegan en el formato correspondiente.", async function() {
        const result = await this.productsDao.get()
        expect(result).to.be.an("array")
    })

    it("DAO: Se obtienen los productos con paginacion. Se deben utilizar los parametros indicados", async function() {
        const result = await this.productsDao.getPaginate({categories: "Lacteos"}, {limit: 5, page: 2, sort: {}, lean: true})
        expect(result.docs).to.be.an("array")
        expect(result.limit).to.be.eql(5)
        expect(result.page).to.be.eql(2)
    })

    it("DAO: Crea un nuevo porducto", async function() {
        const product = {
            title: "Remera Titular de Boca Juniors",
            description: "Es una remera Original de Boca Juniors. Azul y Oro",
            price: 15000,
            stock: 12,
            categories: "Deportes",
            thumbnails: [],
        }

        const result = await this.productsDao.create(product)
        expect(result._id).to.be.ok
    })

    it("DAO: Se usa ID para que llegue un producto en particular.", async function() {
        const data = {
            title: "Remera Titular de Boca Juniors",
            description: "Es una remera Original de Boca Juniors. Azul y Oro",
            price: 15000,
            stock: 12,
            categories: "Deportes",
            thumbnails: [],      
        }

        const product = await this.productsDao.create(data)
        const result = await this.productsDao.getById(product._id)

        expect(result).to.be.ok.and.an("object")    
        expect(result._id).to.be.ok    
    })

    it("DAO: El producto se puede modificar", async function() {
        const data = {
            title: "Remera Titular de Boca Juniors",
            description: "Es una remera Original de Boca Juniors. Azul y Oro",
            price: 15000,
            stock: 12,
            categories: "Deportes",
            thumbnails: [],
            }

        const newData = {
            title: "Remera Titular de Boca Juniors",
            price: 17000,
            stock: 10,
        }

        const product = await this.productsDao.create(data)
        const result = await this.productsDao.update(product._id, newData)
        const updatedProduct = await this.productsDao.getById(product._id)

        expect(result.modifiedCount).to.be.eql(1)
        expect(updatedProduct.title).to.be.eql(newData.title)
        expect(updatedProduct.stock).to.be.eql(newData.stock)
    })

    it("DAO: Se ilimina un porducto.", async function() {
        const data = {
            title: "Remera Titular de Boca Juniors",
            description: "Es una remera Original de Boca Juniors. Azul y Oro",
            price: 15000,
            stock: 12,
            categories: "Deportes",
            thumbnails: [],
            }

        const product = await this.productsDao.create(data)
        const result = await this.productsDao.delete(product._id)
        const deleted = await this.productsDao.getById(product._id)

        expect(result.deletedCount).to.be.eql(1)
        expect(deleted).to.be.eql(null)
    })
})