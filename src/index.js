const db = require("../models/index.js");
//const usuario = require("../models/usuario.js")
const app = require("./app.js");
const Sequelize = require("sequelize")
// app.get('/', (req, res) => {
//   res.send('Hola Mundo');
// });


async function main() {
    try {
        await db.sequelize.authenticate();
        console.log("La coneccion se ha ejecutado correctamente");
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`No se pudo conectar a la base de datos: ${error}`);
    }
}

main();