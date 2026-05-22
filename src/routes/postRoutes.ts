import express, {Router} from 'express';
import { getAllPosts, getPostById, createPost} from '../controllers/postController.js';

const postRouter: Router = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', createPost);

export default postRouter;