import { createAppDataSource, AppDataSource } from "./data-source"
import { Employees } from "./entity/Employees"

async function main() {
    try {
        // Create and initialize the DataSource with the access token
        const dataSource = await createAppDataSource();
        await dataSource.initialize();
        
        console.log("AppDataSource has been initialized!")
        const users = await dataSource.manager.find(Employees)    
        console.log("Loaded users: ", users)

        console.log("Here you can setup and run express / fastify / any other framework.")
        
    } catch (error) {
        console.log("Error initializing application:", error)
    }
}

main();
