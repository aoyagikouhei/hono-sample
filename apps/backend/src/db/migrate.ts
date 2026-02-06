import type { PGlite } from "@electric-sql/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { drizzle } from "drizzle-orm/pglite";

const folderPath = new URL("./migrations", import.meta.url).pathname;

export const executeMigration = async (client: PGlite) => {
    const db = drizzle(client);
    await migrate(db, {
        migrationsFolder: folderPath,
    });
}
