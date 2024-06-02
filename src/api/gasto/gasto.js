const express = require("express");
const db = require("../../../models");
const { Gasto } = require("../../../models");
const { Usuario } = require("../../../models");
const { Plan } = require("../../../models");
const Sequelize = require("sequelize");

const router = express.Router();

router.post("/gasto", async (req, res, next) => {
  const { planId, userId, monto, motivo } = req.body;

  try {
    const newGasto = await Gasto.create({
      planId,
      userId,
      monto,
      motivo,
    });
    // Devuelve el nuevo gasto creado con un código de estado 201
    res.status(201).json(newGasto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Calcula los gastos totales de un usuario en un plan
router.get("/gasto/plan/:planId/user/:userId", async (req, res, next) => {
  const { planId, userId } = req.params;
  try {
    // Sumar los gastos del usuario en los planes del itinerario
    const result = await Gasto.findOne({
      include: {
        where: { planId },
      },
      where: { userId },
    });
    // Obtener el monto total de gastos
    res.json({ result });
  } catch (error) {
    console.error("Error fetching gastos from plan:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Calcula los gastos totales de un usuario en un itinerario
router.get(
  "/gasto/itinerario/:itinerarioId/user/:userId",
  async (req, res, next) => {
    const { itinerarioId, userId } = req.params;
    try {
      // Sumar los gastos del usuario en los planes del itinerario
      const result = await Gasto.findOne({
        include: {
          model: Plan,
          where: { itinerarioId },
          attributes: [], // No necesitamos seleccionar ningún campo del modelo Plan
          required: true,
        },
        where: { userId },
        //Esto un Join junto con un SUM que ya me trae la suma de montos que estoy buscando
        attributes: [
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn("SUM", Sequelize.col("Gasto.monto")),
              0
            ),
            "totalGastos",
          ],
        ],
        raw: true,
      });
      // Obtener el monto total de gastos
      const totalGastos = result ? result.totalGastos : 0;
      res.json({ totalGastos });
    } catch (error) {
      console.error("Error fetching gastos from Itinerario:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Calcula los gastos de todos los usuarios en un itinerario
router.get("/gasto/itinerario/:itinerarioId", async (req, res, next) => {
  const { itinerarioId } = req.params;
  try {
    // Sumar los gastos en los planes del itinerario
    const result = await Gasto.findOne({
      include: {
        model: Plan,
        where: { itinerarioId },
        attributes: [], // No necesitamos seleccionar ningún campo del modelo Plan
        required: true,
      },
      //Esto un Join junto con un SUM que ya me trae la suma de montos que estoy buscando
      attributes: [
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("Gasto.monto")),
            0
          ),
          "totalGastos",
        ],
      ],
      raw: true,
    });

    // Obtener el monto total de gastos
    const totalGastos = result ? result.totalGastos : 0;

    res.json({ totalGastos });
  } catch (error) {
    console.error("Error fetching gastos from Itinerario:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/gasto/:gastoId", async (req, res, next) => {
  const { gastoId } = req.params;
  try {
    // Busca el gasto por su ID
    const gasto = await Gasto.findByPk(gastoId);

    // Si el gasto no existe, devuelve un error 404
    if (!gasto) {
      return res.status(404).send("Gasto not found");
    }

    // Finalmente, elimina el plan
    await gasto.destroy();

    //Respuesta
    res.status(200).send(`Gasto with ID ${gastoId} was deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
