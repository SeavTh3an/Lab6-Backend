import { Router } from "express";
import { getCategories, getArticlesByCategory } from "../controllers/articleController.js";

const categoryRouter = Router();

categoryRouter.get("/:category_id/articles", getArticlesByCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;