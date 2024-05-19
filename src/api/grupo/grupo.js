const express = require("express");
const db = require("../../../models");
const { Grupo } = require("../../../models");
const { GrupoViaje } = require("../../../models");
const { Usuario } = require("../../../models");
const router = express.Router();

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

    res.status(200).send(grupo);
  } catch (error) {
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
          // NOTA: No esta devolviendo solo el id de los usuarios que pertencen al grupo
          // esta devolviendo el modelo entero de todos los grupo viaje que contengan el id del grupo que esta buscando
          model: GrupoViaje,
        },
      ],
    });

    if (!grupo) {
      return res.status(404).send("Grupo no encontrado");
    }

    //NOTA: Aqui estoy haciendo una lista con solo los id de los usuarios que pertenecen a este grupo
    const usersIds = grupo.GrupoViajes.map(grupoViaje => grupoViaje.userId);
  

    res.json({grupo,usersIds});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
