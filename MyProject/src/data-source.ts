import "reflect-metadata"
import { DataSource } from "typeorm"
import { ManagedIdentityCredential } from "@azure/identity"
import { Employees } from "./entity/Employees"

// Function to get access token for SQL Server using User Assigned Managed Identity
async function getAccessToken(): Promise<string> {
    const credential = new ManagedIdentityCredential({
        clientId: process.env.AZURE_CLIENT_ID // User Assigned Managed Identity Client ID
    });
    
    const tokenResponse = await credential.getToken("https://database.windows.net/");
    if (!tokenResponse) {
        throw new Error("Failed to acquire access token for SQL Server");
    }
    
    return tokenResponse.token;
}

// Function to create and initialize DataSource with access token
export async function createAppDataSource(): Promise<DataSource> {
    const token = await getAccessToken();
    
    return new DataSource({
        type: "mssql",
        host: process.env.SQL_HOST || "localhost",
        database: process.env.SQL_DB || "testdb",
        synchronize: false,
        logging: false,
        entities: [Employees],
        migrations: [],
        subscribers: [],
        extra: {
            authentication: {
                type: "azure-active-directory-access-token",
                options: {
                    token: token // Now this is a string, not a function
                }
            },
            encrypt: true,
            trustServerCertificate: false
        }
    });
}

// Export a placeholder that will be initialized later
export let AppDataSource: DataSource;
