import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import { ArticleCard } from './ArticleList';
import { getArticlesByJournalist, getArticlesByCategory, getCategories } from '../services/api';

export const JournalistArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { jour_id } = useParams(); // ✅ get jour_id from URL params

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [jour_id]);
  useEffect(() => {
    if (selectedCategoryIds.length > 0) {
      fetchFilteredArticles(selectedCategoryIds);
    } else {
      fetchArticles();
    }
  }, [selectedCategoryIds]);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticlesByJournalist(jour_id); // ✅ pass jour_id
      setArticles(data);
      console.log("Fetched articles:", data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const deleteArticle = async (id) => {
      setIsLoading(true);
      setError("");
      try {
        await removeArticle(id);
        await fetchArticles(); // refresh the list
      } catch (err) {
        setError("Failed to delete article.");
      } finally {
        setIsLoading(false);
      }
    };
    const fetchFilteredArticles = async (categoryIds) => {
        setIsLoading(true);
        setError("");
        try {
          const categoryId = categoryIds[0]; // For single category filtering
          if (!categoryId) return;
          const data = await getArticlesByCategory(categoryId);
          console.log("Filtered Articles:", data);
          setArticles(data);
        } catch (err) {
          setError("Failed to filter articles.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      const fetchCategories = async () =>{
        try{
          const data = await getCategories();
          console.log("Fetched Categories:", data);
          setCategories(data);
        }
        catch (err) {
          setError("Failed to load categories. Please try again.");
        }
      }


  const handleEdit = (id) => navigate(`/articles/${id}/edit`);
  const handleView = (id) => navigate(`/articles/${id}`);

  const handleCategoryChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions).map(opt => opt.value);
    console.log("Selected Category IDs:", selectedIds);
    setSelectedCategoryIds(selectedIds);
  };
   return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label htmlFor="category-filter">Filter by Categories:</label>
      <select
        id="category-filter"
        multiple
        onChange={handleCategoryChange}
        style={{ minWidth: "200px", height: "50px", marginLeft: "20px" }}
      >
        {categories.map((cat) => (
          <option key={cat.cat_id} value={cat.cat_id}>
            {cat.category_name}
          </option>
        ))}
      </select>
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
            journalist_name={article.journalist_name}
          />
        ))}
      </div>
    </>
    );
};