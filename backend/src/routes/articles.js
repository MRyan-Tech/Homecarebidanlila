import express from "express";
import Article from "../models/Article.js";
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

// GET all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll({ order: [["createdAt", "DESC"]] });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data artikel", error: err.message });
  }
});

// GET article by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ where: { slug: req.params.slug } });
    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil artikel", error: err.message });
  }
});

// POST new article (Admin)
router.post("/", verifyToken, async (req, res) => {
  const { title, summary, content, category, image, keywords } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Judul, ringkasan, dan konten wajib diisi" });
  }

  try {
    const slug = slugify(title);
    const existing = await Article.findOne({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const newArticle = await Article.create({
      title,
      slug: finalSlug,
      summary,
      content,
      category: category || "Kesehatan Ibu & Anak",
      image: image || "/images/articles/default.jpg",
      keywords: keywords || "",
      author: "Bidan Lila",
    });

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat artikel baru", error: err.message });
  }
});

// PUT update article (Admin)
router.put("/:id", verifyToken, async (req, res) => {
  const { title, summary, content, category, image, keywords } = req.body;

  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    article.title = title !== undefined ? title : article.title;
    if (title !== undefined) {
      const slug = slugify(title);
      if (slug !== article.slug) {
        const existing = await Article.findOne({ where: { slug } });
        article.slug = existing ? `${slug}-${Date.now()}` : slug;
      }
    }
    article.summary = summary !== undefined ? summary : article.summary;
    article.content = content !== undefined ? content : article.content;
    article.category = category !== undefined ? category : article.category;
    article.image = image !== undefined ? image : article.image;
    article.keywords = keywords !== undefined ? keywords : article.keywords;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui artikel", error: err.message });
  }
});

// DELETE article (Admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }
    await article.destroy();
    res.json({ message: "Artikel berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus artikel", error: err.message });
  }
});

export default router;
