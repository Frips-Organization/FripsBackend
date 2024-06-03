const express = require("express");
const db = require("../../../models");
const { Itinerario } = require("../../../models");
const { Grupo } = require("../../../models");
const { Plan } = require("../../../models");
const { Lugar } = require("../../../models");
const { Gasto } = require("../../../models");
const { where } = require("sequelize");

const router = express.Router();

// Ruta POST para crear un itinerario
router.post("/itinerario", async (req, res) => {
  const { nombre, grupoId, fecha, userId } = req.body;

  try {
    // Crea un nuevo itinerario con los datos proporcionados
    const newItinerary = await Itinerario.create({
      nombre,
      grupoId,
      fecha,
      userId,
    });

    // Devuelve el itinerario creado con un código de estado 201
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Busca los itinerarios que pertenecen a un grupo, por el ID del grupo
router.get("/itinerario/:grupoId", async (req, res, next) => {
  const { grupoId } = req.params;

  try {
    const itinerarios = await Grupo.findOne({
      where: { grupoId },
      include: [
        {
          model: Itinerario,
          include: [
            {
              model: Plan,
              include: [
                {
                  model: Gasto,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!itinerarios) {
      return res.status(404).send("Itinerario no econtrado");
    }

    res.json({ itinerarios });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/itinerario/:itinerarioId", async (req, res) => {
  const { itinerarioId } = req.params;

  try {
    //Encuentra el itinerario a eliminar
    const itinerario = await Itinerario.findByPk(itinerarioId);
    if (!itinerario) {
      return res.status(404).send("Itinerario no encontrado");
    }

    //Planes del itinerario
    const planes = await Plan.findAll({
      where: { itinerarioId },
    });

    // Si hay planes asociados al itinerario, entonces...
    if (planes) {
      //Elimino todos los planes del itinerario
      for (const plan of planes) {
        const planId = plan.planId;
        //Lugares de este plan asociado al itinerario
        const lugar = await Lugar.findOne({
          where: { planId },
        });
         //Elimino el lugar asociado al plan
          await lugar.destroy();
            //Gastos del plan
            const gastos = await Gasto.findAll({
            where: { planId:planId },
            });
            //Si hay gastos asociados al plan:
            if (gastos) {
              for (const gasto of gastos) {
              // const gastoId = gasto.gastoId;
              // // Eliminar primero el gasto asociado al plan
              // await Gasto.destroy({ where: { gastoId: gastoId } });
              await gasto.destroy();
              }
            }
        await plan.destroy();
      }

    //Elimina el itinerario
    await itinerario.destroy();

    res.status(200).send("Itinerario eliminado correctamente");
  }} catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
