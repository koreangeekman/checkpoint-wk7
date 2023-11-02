import { AppState } from "../AppState";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class CommentsService {

  // async getComments() {
  //   const res = await api.get('api/comments');
  //   const comments = res.data.map(comment => new Comment(comment));
  //   AppState.comments = comments;
  //   // logger.log('[COMMENTS SERVICE] getComments(): ', comments);
  // }

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    const comments = res.data.map(comment => new Comment(comment));
    AppState.comments = comments;
    logger.log('[COMMENTS SERVICE] getCommentsByEventId(): ', comments);
  }
  
  async createComment(comment) {
    const res = await api.post('api/comments', comment);
    const newComment = new Comment(res.data)
    AppState.comments.push(newComment)
    logger.log('[COMMENTS SERVICE] createComment(): ', newComment);
  }

  async deleteComment(commentObj) {
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentObj.id);
    if (commentIndex == -1) { throw new Error('Unable to find comment');}
    if (commentObj.creatorId != AppState.account.id) { throw new Error('Not your comment to delete'); }
    const res = await api.delete(`api/comments/${commentObj.id}`)
    AppState.comments.splice(commentIndex, 1);
    logger.log('Deleted comment. ', res.data)
  }

}

export const commentsService = new CommentsService();