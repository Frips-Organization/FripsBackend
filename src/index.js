import app from "./app.js";
import { sequelize } from "./database/database.js";

// app.get('/', (req, res) => {
//   res.send('Hola Mundo');
// });

async function main() {
  try {
    await sequelize.authenticate();
    console.log("La coneccion se ha ejecutado correctamente");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

    app;
  } catch (error) {
    console.log(`No se pudo conectar a la base de datos: ${error}`);
  }
}

main();