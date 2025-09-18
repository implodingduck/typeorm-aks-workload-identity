import { AppDataSource } from "./data-source"
import { Employees } from "./entity/Employees"

AppDataSource.initialize().then(async () => {
    console.log("AppDataSource has been initialized!")
    const users = await AppDataSource.manager.find(Employees)    
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
