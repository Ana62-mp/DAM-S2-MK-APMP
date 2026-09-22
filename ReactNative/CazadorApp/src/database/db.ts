import * as SQLite from "expo-sqlite";

export async function initDatabase() {
  const db = await SQLite.openDatabaseAsync("cazador.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      calificacion INTEGER NOT NULL,
      comentarios TEXT NOT NULL,
      fotoBase64 TEXT NOT NULL,
      fecha TEXT NOT NULL
    );
  `);
}