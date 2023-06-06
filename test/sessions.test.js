import mongoose from "mongoose";
import chai from "chai";
import config from "../src/config/config.js";
import User from "../src/dao/mongo/users.mongo.js";

mongoose.connect(config.TEST_MONGO_URI);
const expect = chai.expect;

describe("Testeando el Dao: Usuarios", () => {
  before(function () {
    this.usersDao = new User();
  });

  beforeEach(function () {
    mongoose.connection.collections.users.drop();
    this.timeout(5000);
  });

  it("DAO: Todos los usuarios llegan en el formato correspondiente.", async function () {
    const result = await this.usersDao.get();
    expect(result).to.be.an("array");
  });

  it("DAO: Se agrega un usuario a la Base de Datos", async function () {
    const mockUser = {
      first_name: "testeando",
      last_name: "Usuarios",
      email: "testeandoUsuarios@gmail.com",
      password: "testeandousuarios",
      age: "28",
      role: "admin",
    };

    const result = await this.usersDao.create(mockUser);

    expect(result._id).to.be.ok;
  });

  it("DAO: Se usa ID o Email para que llegue un usuarios en particular.", async function () {
    const mockUser = {
        first_name: "testeando",
        last_name: "Usuarios",
        email: "testeandoUsuarios@gmail.com",
        password: "testeandousuarios",
        age: "28",
        role: "admin",
      };

    const user = await this.usersDao.create(mockUser);

    const result = await this.usersDao.getOneByID(user._id)
    const result2 = await this.usersDao.getOneByEmail(user.email)

    expect(result).to.be.ok.and.an("object")
    expect(result2).to.be.ok.and.an("object")

  });

  it("DAO: Se modifica un Usuario", async function () {
    const mockUser = {
      first_name: "testeando",
      last_name: "Usuarios",
      email: "testeandoUsuarios@gmail.com",
      password: "testeandousuarios",
      age: "28",
      role: "admin",
      };

    const user = await this.usersDao.create(mockUser);

    const data = {
        first_name: "testeandoModificado",
        password: "secret"
    }

    await this.usersDao.update(user._id, data)
    const updatedUser = await this.usersDao.getOneByID(user._id)

    expect(updatedUser.first_name).to.be.eql(data.first_name)
    expect(updatedUser.password).to.be.eql(data.password)
  });
});