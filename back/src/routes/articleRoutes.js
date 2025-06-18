import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getArticleWithJournalist, getArticlesByJournalist } from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);
articleRouter.get("/journalist/:id", getArticlesByJournalist);
articleRouter.get("/:id/full", getArticleWithJournalist);

export default articleRouter;
