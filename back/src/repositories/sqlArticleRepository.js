import { pool } from '../utils/database.js';

// Get all articles with journalist names
export async function getAllArticles() {
  const [rows] = await pool.query('select * from articles');
    return rows;
}

// Get one article by article ID with journalist info
export async function getArticleById(id) {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist_name, j.email, j.bio
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
    WHERE a.id = ?
  `, [id]);
  return rows[0];
}

// Get all articles by a journalist ID
export async function getArticlesByJournalistId(journalistId) {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist_name
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
    WHERE j.id = ?
  `, [journalistId]);
  return rows;
}

// Create a new article (expects journalist_id)
export async function createArticle(article) {
  const { title, content, journalist_id, category } = article;
  const [result] = await pool.query(
    'INSERT INTO articles (title, content, journalist_id, category) VALUES (?, ?, ?, ?)',
    [title, content, journalist_id, category]
  );
  return { id: result.insertId, ...article };
}

// Update article by ID
export async function updateArticle(id, updatedData) {
  const { title, content, journalist_id, category } = updatedData;
  await pool.query(
    'UPDATE articles SET title = ?, content = ?, journalist_id = ?, category = ? WHERE id = ?',
    [title, content, journalist_id, category, id]
  );
  return { id, ...updatedData };
}

// Delete article by ID
export async function deleteArticle(id) {
  await pool.query('DELETE FROM articles WHERE id = ?', [id]);
}
