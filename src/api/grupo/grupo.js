const express = require("express");
const db = require("../../../models");
const { Grupo } = require("../../../models");
const { GrupoViaje } = require("../../../models");
const { Usuario } = require("../../../models");
const { Itinerario } = require("../../../models");
const { Plan } = require("../../../models");


const cloudinary = require("cloudinary").v2; // Asegúrate de tener esta línea
require("dotenv").config();
const router = express.Router();

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/grupo", async (req, res, next) => {
  const { nombre, userEmails } = req.body;

  try {
    const grupo = await Grupo.create({
      nombre: nombre,
      estado: true,
    });

    const grupoId = grupo.grupoId; // Accede al ID del grupo creado

    // Itera sobre cada correo electrónico en userEmails
    for (let index = 0; index < userEmails.length; index++) {
      const userEmail = userEmails[index];

      // Busca el usuario por su correo electrónico
      const user = await Usuario.findOne({
        where: {
          email: userEmail,
        },
      });

      // Si se encuentra el usuario, crea una entrada en GrupoViaje asociando el usuario con el grupo
      if (user) {
        await GrupoViaje.create({
          grupoId,
          userId: user.userId,
        });
      }
    }

    // Crea una carpeta en cloudinary con el Id del grupo
    await cloudinary.api.create_folder(grupoId.toString());

    res.status(200).send(grupo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Agrega un nuevo invitado al grupo
router.post("/grupo/invitados", async (req, res, next) => {
  const { grupoId, userEmails } = req.body;
  try {

    // Itera sobre cada correo electrónico en userEmails
    for (let index = 0; index < userEmails.length; index++) {
      const userEmail = userEmails[index];

      // Busca el usuario por su correo electrónico
      const user = await Usuario.findOne({
        where: {
          email: userEmail,
        },
      });

      // Si se encuentra el usuario, crea una entrada en GrupoViaje asociando el usuario con el grupo
      if (user) {
        await GrupoViaje.create({
          grupoId: grupoId,
          userId: user.userId,
        });
      }
    }
   res.status(200).send("Usuarios agregados al grupo "+grupoId);
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



router.get("/grupo/:grupoId", async (req, res, next) => {
  const { grupoId } = req.params;

  try {
    // Busca el grupo por su ID e incluye los usuarios relacionados a través de GrupoViaje
    const grupo = await Grupo.findOne({
      where: { grupoId },
      include: [
        {
          // NOTA: No está devolviendo solo el id de los usuarios que pertenecen al grupo
          // está devolviendo el modelo entero de todos los grupo viaje que contengan el id del grupo que está buscando
          model: GrupoViaje,
        },
      ],
    });

    if (!grupo) {
      return res.status(404).send("Grupo no encontrado");
    }

    // NOTA: Aquí estoy haciendo una lista con solo los id de los usuarios que pertenecen a este grupo
    const usersIds = grupo.GrupoViajes.map((grupoViaje) => grupoViaje.userId);

    res.json({ grupo, usersIds });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/grupos", async (req, res, next) => {
  try {
    const grupos = await Grupo.findAll({
      include: [
        {
          model: GrupoViaje,
          include: [
            { model: Usuario, attributes: ["userId", "nombre", "email"] },
          ],
        },
      ],
    });

    const response = grupos.map((grupo) => {
      const usersIds = grupo.GrupoViajes.map(
        (grupoViaje) => grupoViaje.Usuario.userId
      );
      return { grupo, usersIds };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/grupo/:grupoId", async (req, res, next) => {
  const { grupoId } = req.params;
  try {

    //Busca todos los itinerarios asociados al grupo
    const itinerarios = await Itinerario.findAll({
      where: {grupoId}
    });

    // Si hay itinerarios asociados al grupo, entonces...
    if (itinerarios){ 
      //Paso por cada itinerario y elimino los planes asociados
      for (const itinerario of itinerarios) {
        await Plan.destroy({
        where: { itinerarioId: itinerario.itinerarioId }
      });
    }
    //Elimina los itinerarios asociados al grupo
    await Itinerario.destroy({
      where: { grupoId }
    });
    }

    // Eliminar los registros en GrupoViaje asociados con el grupo
    await GrupoViaje.destroy({
      where: { grupoId },
    });

    // Luego eliminar el grupo
    const rowsDeleted = await Grupo.destroy({
      where: { grupoId },
    });

    if (rowsDeleted === 0) {
      return res.status(404).send("Grupo no encontrado");
    }

    // Eliminar la carpeta en Cloudinary
    await cloudinary.api.delete_folder(grupoId.toString());

    res.status(200).send(`Grupo con ID ${grupoId} eliminado correctamente`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
