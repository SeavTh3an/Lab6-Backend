import {Router} from 'express';
import { getArticlesByjournalist } from '../controllers/articleController.js';


const journlistRouter = Router();
journlistRouter.get('/:jour_id/articles', getArticlesByjournalist);

export default journlistRouter;