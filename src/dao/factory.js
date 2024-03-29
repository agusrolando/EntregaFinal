import config from "../config/config.js";
import mongoose from "mongoose";

export let Cart
export let Message
export let Product
export let User
export let Mock

console.log(`PERSISTENCE [${config.persistence}]`);
switch (config.persistence) {
    case 'FILE':
        
        const { default: ProductFile } = await import('./file/products_file.js')
        const { default: MessageFile } = await import('./file/messages_file.js')
        const { default: UserFile } = await import('./file/users_file.js')
        const { default: CartFile } = await import('./file/carts_file.js')

        Product = ProductFile
        Message = MessageFile
        Cart = CartFile
        User = UserFile

        break;
    case 'MONGO':
        mongoose.set("strictQuery", false)
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongoDBName
        }, () => console.log('Conectado a mongo'))
                
        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        const { default: MessageMongo } = await import('./mongo/messages.mongo.js')
        const { default: UserMongo } = await import('./mongo/users.mongo.js')
        const { default: CartMongo } = await import('./mongo/carts.mongo.js')
        const { default: MockMongo } = await import('./mongo/mock.mongo.js')

        Product = ProductMongo
        Message = MessageMongo
        Cart = CartMongo
        User = UserMongo
        Mock = MockMongo

        break;
    default:
        break;
}