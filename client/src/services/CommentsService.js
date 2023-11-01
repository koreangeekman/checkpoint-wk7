import { AppState } from "../AppState";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class CommentsService {

  async getComments() {
    const res = await api.get('api/comments');
    const comments = res.data.map(comment => new Comment(comment));
    AppState.comments = comments;
    logger.log('[COMMENTS SERVICE] getComments(): ', comments);
  }



}

export const commentsService = new CommentsService();