const express = require("express");
const { v2: cloudinary } = require("cloudinary");
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint para obtener los recursos de Cloudinary
router.get("/cloud/:folderName", async (req, res) => {
  const { folderName } = req.params;

  try {
    const raw = await cloudinary.api.resources({
      max_results: 500,
      type: "upload",
      prefix: folderName,
      resource_type: "raw",
    });
    const image = await cloudinary.api.resources({
      max_results: 500,
      type: "upload",
      prefix: folderName,
      resource_type: "image",
    });
    const mp3 = await cloudinary.api.resources({
      max_results: 500,
      type: "upload",
      prefix: folderName,
      resource_type: "video",
    });
    const video = await cloudinary.api.resources({
      max_results: 500,
      type: "upload",
      prefix: folderName,
      resource_type: "video",
    });

    // Construye el objeto de respuesta con los resultados de cada tipo de archivo
    const result = {
      raw: raw.resources || [],
      image: image.resources || [],
      mp3: mp3.resources || [],
      video: video.resources || [],
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching resources from Cloudinary:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/cloud/", async (req, res) => {
  const { publicId, type } = req.body;
  console.log(publicId);
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: type });
    res.status(200).send("Resource deleted successfully");
  } catch (error) {
    console.error("Error deleting resource from Cloudinary:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
