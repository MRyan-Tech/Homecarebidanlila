import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, // Supports html/markdown
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Bidan Lila",
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Kesehatan Ibu & Anak",
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  keywords: {
    type: DataTypes.STRING, // Comma separated SEO keywords
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Article;
