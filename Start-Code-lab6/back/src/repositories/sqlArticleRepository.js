//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from '../utils/database.js';

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query(
        'SELECT a.*, j.name as journalist_name, c.category_name as cat_name FROM articles a join journalists j on a.jour_id = j.jour_id join category c on a.category_id = c.category_id');
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query('SELECT a.*, j.name as journalist_name FROM articles a join journalists j on a.jour_id = j.jour_id WHERE a.id = ?', [id]);
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const [result] = await pool.query('INSERT INTO articles (title, content, jour_id, category_id) VALUES (?, ?, ?, ?)',
        [article.title, article.content, article.journalist, article.category]);
    return {id: result.insertId, ...article};
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const [result] = await pool.query('UPDATE articles SET title = ?, content = ?, jour_id = ?, category_id = ? WHERE id = ?',
        [updatedData.title, updatedData.content, updatedData.journalist, updatedData.category, id]);
    return result.affectedRows > 0 ? {id, ...updatedData} : null;
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
// Get articles by jounalist
export async function getArticlesByjournalist(jour_id){
    const [rows] = await pool.query(
        'SELECT a.*, j.name as journalist_name, c.category_name as cat_name FROM articles a JOIN journalists j ON a.jour_id = j.jour_id join category c on a.category_id = c.category_id WHERE a.jour_id = ?',
        [jour_id]
    )
    return rows;
}

// category
export async function getCategories(){
    const [rows] = await pool.query('SELECT category_id as cat_id, category_name from category');
    return rows;
}
export async function getArticlesByCategory(categoryId) {
  const [articles] = await pool.query(
    'SELECT a.*, j.name as journalist_name, c.category_name as cat_name FROM articles a join journalists j on a.jour_id = j.jour_id join category c on a.category_id = c.category_id WHERE a.category_id = ?',
    [categoryId]
  );
  return articles;
}