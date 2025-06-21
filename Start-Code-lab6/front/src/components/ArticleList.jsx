import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, removeArticle, getCategories, getArticlesByCategory } from "../services/api";
import { Link } from "react-router-dom";

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
    fetchCategories(); // Fetch categories when component mounts
  }, []);
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
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
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

  const handleView = (id) => navigate(`/articles/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  const handleCategoryChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions).map(opt => opt.value);
    navigate(`/category/${selectedIds.join(",")}/articles`);
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
}

export function ArticleCard({ article, onView, onEdit, onDelete, journalist_name }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">By <Link to={`/journalist/${article.jour_id}/articles`}>{journalist_name}</Link></div>
       <div className="article-categories">
        Categories: {article.cat_name || "None"}
      </div>
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
