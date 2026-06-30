import express from "express";
import Service from "../models/Service.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

// Helper to make slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({ order: [["createdAt", "DESC"]] });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data layanan", error: err.message });
  }
});

// GET service by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const service = await Service.findOne({ where: { slug: req.params.slug } });
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data layanan", error: err.message });
  }
});

// POST new service (Admin)
router.post("/", verifyToken, async (req, res) => {
  const { name, category, description, price, duration, image } = req.body;
  if (!name || !category || price === undefined || !duration) {
    return res.status(400).json({ message: "Nama, kategori, harga, dan durasi wajib diisi" });
  }

  try {
    const slug = slugify(name);
    // Check if slug exists
    const existing = await Service.findOne({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const newService = await Service.create({
      name,
      slug: finalSlug,
      category,
      description,
      price,
      duration,
      image: image || "/images/services/default.jpg",
    });

    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat layanan baru", error: err.message });
  }
});

// PUT update service (Admin)
router.put("/:id", verifyToken, async (req, res) => {
  const { name, category, description, price, duration, image } = req.body;

  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    service.name = name !== undefined ? name : service.name;
    if (name !== undefined) {
      const slug = slugify(name);
      if (slug !== service.slug) {
        const existing = await Service.findOne({ where: { slug } });
        service.slug = existing ? `${slug}-${Date.now()}` : slug;
      }
    }
    service.category = category !== undefined ? category : service.category;
    service.description = description !== undefined ? description : service.description;
    service.price = price !== undefined ? price : service.price;
    service.duration = duration !== undefined ? duration : service.duration;
    service.image = image !== undefined ? image : service.image;

    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui layanan", error: err.message });
  }
});

// DELETE service (Admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    await service.destroy();
    res.json({ message: "Layanan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus layanan", error: err.message });
  }
});

export default router;
