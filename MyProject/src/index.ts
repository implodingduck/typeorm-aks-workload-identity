import { createAppDataSource, AppDataSource } from "./data-source"
import { Employees } from "./entity/Employees"
import { WorkloadIdentityCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

async function main() {
    try {
        console.log("Starting application...");

        const keyVaultUrl = process.env["KEYVAULT_URL"];
        const secretName = process.env["SECRET_NAME"];
        console.log(`Key Vault URL: ${keyVaultUrl}, Secret Name: ${secretName}`);
        
        const credential = new WorkloadIdentityCredential();
        const client = new SecretClient(keyVaultUrl, credential);

        const secret = await client.getSecret(secretName);
        console.log(`Retrieved secret: ${secret.name} with value: ${secret.value}`);

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
