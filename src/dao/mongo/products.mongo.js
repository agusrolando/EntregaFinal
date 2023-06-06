import ProductModel from "./models/products.model.js"
import CustomError from "../../errors/custom.errors.js"
import EErros from "../../errors/enums.js"
import { generateProdErrorInfo } from "../../errors/info.js"
import MockModel from "./models/mock.model.js"


export default class Product {
    constructor() {}

    get = async() => {
        return await ProductModel.find().lean().exec()
    }

    getPaginate = async(search, options) => {
        return await ProductModel.paginate(search, options)
    }

    create = async(data) => {
        if(!data.title){
            CustomError.createError({
                name: "No, no se creo el titulo",
                cause: generateProdErrorInfo(),
                message: "No se creo el producto",
                code: EErros.INVALID_TYPES_ERROR
            })
        }
        return await ProductModel.create(data)
    }

    getById = async (id) => {
        return await ProductModel.findOne({_id: id})    
    }

    getOneByID = async(id) => {
        return await ProductModel.findById(id).lean().exec()
    }

    delete = async (id) => {
        return await ProductModel.deleteOne({_id: id})
    }

    update = async (id, productToUpdate) => {
        return await ProductModel.updateOne({_id: id}, productToUpdate)
    }
}