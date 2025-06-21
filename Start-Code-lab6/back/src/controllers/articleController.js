import * as sqlarticleRepository from "../repositories/sqlArticleRepository.js";

// TODO : Change articleRepository to use the sqlArticleRepository

// GET /api/articles
export async function getAllArticles(req, res) {
  try {
    const articles = await sqlarticleRepository.getArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/articles/:id
export async function getArticleById(req, res) {
  try {
    const article = await sqlarticleRepository.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/articles
export async function createArticle(req, res) {
  try {
    const newArticle = await sqlarticleRepository.createArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /api/articles/:id
export async function updateArticle(req, res) {
  try {
    const updatedArticle = await sqlarticleRepository.updateArticle(
      req.params.id,
      req.body
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /api/articles/:id
export async function deleteArticle(req, res) {
  try {
    await sqlarticleRepository.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get /api/articles/journalist/:jour_id
export async function getArticlesByjournalist(req, res){
  try {
    const articles = await sqlarticleRepository.getArticlesByjournalist(req.params.jour_id);
    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "No articles found for this journalist" });
    }
    res.json(articles);
  }catch (error) {
    console.error("Error fetching articles by journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}
export async function getCategories(req, res) {
  try {
    const categories = await sqlarticleRepository.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}
export async function getArticlesByCategory(req, res) {
  try {
    const categoryId = req.params.category_id; // Changed from category to categoryId
    const articles = await sqlarticleRepository.getArticlesByCategory(categoryId);
    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "No articles found for this category" });
    }
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    res.status(500).json({ message: "Server error" });
  }
}