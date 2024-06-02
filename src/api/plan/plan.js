const express = require("express");
const db = require("../../../models");
const { Plan } = require("../../../models");
const { Lugar } = require("../../../models");
const { Itinerario } = require("../../../models");
const { Gasto } = require("../../../models");
const router = express.Router();

//post plan
router.post("/plan", async (req, res) => {
  const {
    nombreLugar,
    itinerarioId,
    userId,
    descripcion,
    horaLlegada,
    horaSalida,
    puntoPartida,
    motivo,
  } = req.body;
  //let createdAt pueden ser null y definirse despues
  //let updatedAt

  try {
    const plan = await Plan.create({
      itinerarioId: itinerarioId,
      userId: userId,
      nombreLugar: nombreLugar,
      descripcion: descripcion,
      horaLlegada: horaLlegada,
      horaSalida: horaSalida,
      puntoPartida: puntoPartida,
      motivo: motivo,
    });
    console.log("-------------REQUEST> ", plan.planId);
    //Aqui hace falta verificar que si el nombre del lugar ya
    //existe en la tabla "Lugar", entonces se salte la siguiente insercion

    const lugar = await Lugar.create({
      nombre: nombreLugar,
      planId: plan.planId,
      descripcion: "sin descripcion", //Estos son valores por defecto para un nuevo lugar
      ubicacion: "sin especificar",
    });

    res.status(201).send("Created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/plan/:itinerarioId", async (req, res, next) => {
  const { itinerarioId } = req.params;

  try {
    const planes = await Itinerario.findOne({
      where: { itinerarioId },
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
    });

    if (!planes) {
      return res.status(404).send("Plane no econtrado");
    }

    res.json({ planes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/grupo/:grupoId/planes", async (req, res, next) => {
  const { grupoId } = req.params;

  try {
    // Encuentra todos los itinerarios asociados al grupo
    const itinerarios = await Itinerario.findAll({
      where: { grupoId },
      include: [
        {
          model: Plan,
        },
      ],
    });

    // Array para almacenar todos los planes de todos los itinerarios con fecha del itinerario
    const planesConFecha = [];

    // Itera sobre cada itinerario y agrega sus planes con fecha del itinerario al array planesConFecha
    itinerarios.forEach((itinerario) => {
      itinerario.Plans.forEach((plan) => {
        // Incluye la fecha del itinerario junto con el plan
        const planConFecha = {
          ...plan.toJSON(),
          fechaItinerario: itinerario.fecha,
        };
        planesConFecha.push(planConFecha);
      });
    });

    res.json({ planes: planesConFecha });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/plan/:planId", async (req, res, next) => {
  const { planId } = req.params;

  try {
    // Busca el plan por su ID
    const plan = await Plan.findByPk(planId);

    // Si el plan no existe, devuelve un error 404
    if (!plan) {
      return res.status(404).send("Plan not found");
    }

    // Eliminar primero el lugar asociado al plan
    await Lugar.destroy({ where: { nombre: plan.nombreLugar } });
    // Eliminar primero el gasto asociado al plan
    await Gasto.destroy({ where: { planId: plan.planId } });

    // Luego elimina la relación del plan con el itinerario
    plan.itinerarioId = null;
    await plan.save();

    // Finalmente, elimina el plan
    await plan.destroy();

    res
      .status(200)
      .send(
        `Plan with ID ${planId} and its associated place deleted successfully`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
