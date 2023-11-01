
import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

function _captureData(newData) {
  const updateable = {
    // DEFINE THE PROPERTIES ALLOWED TO UPDATE BELOW
    body: newData.body,
    isAttending: newData.isAttending,
    eventId: newData.eventId,
  }
  return updateable
}

class CommentsService {

  async getComments(query) {
    const comments = await dbContext.Comments.find(query)
      .populate('creator', 'name picture');
    logger.log('[COMMENTS SERVICE] getComments(): ', comments);
    return comments
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
      .populate('creator', 'name picture');
    if (!comment) { throw new BadRequest(`No comment with ID: ${commentId}`) }
    logger.log('[COMMENTS SERVICE] getCommentById(): ', comment);
    return comment
  }

  async getCommentsByAccountId(accountId) {
    const comments = await dbContext.Comments.find({ accountId })
      .populate('creator', 'name picture');
    if (!comments) { throw new BadRequest(`No comment with Account ID: ${accountId}`) }
    logger.log('[COMMENTS SERVICE] getCommentsByAccountId(): ', comments);
    return comments
  }

  async getCommentsByTowerEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId })
      .populate('creator', 'name picture');
    if (!comments) { throw new BadRequest(`No comment with ID: ${eventId}`) }
    logger.log('[COMMENTS SERVICE] getCommentById(): ', comments);
    return comments
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createComment(body) {
    const newComment = await dbContext.Comments.create(body)
    await newComment.populate('creator', 'name picture');
    logger.log('[COMMENTS SERVICE] createComment(): ', newComment);
    return newComment
  }

  async removeComment(commentId, userId) {
    const toBeDeleted = await dbContext.Comments.findById(commentId);
    if (toBeDeleted.creatorId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your comment to remove') }
    const results = await dbContext.Comments.remove(toBeDeleted);
    logger.log('[COMMENTS SERVICE] removeComment(): ', results);
    return results
  }

  async updateComment(commentId, newData, userId) {
    const toBeUpdated = await dbContext.Comments.findById(commentId);
    if (toBeUpdated.creatorId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your comment to update') }
    const update = _captureData(newData);
    const updated = await dbContext.Comments.findOneAndUpdate(
      { _id: commentId },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    );
    logger.log('[COMMENTS SERVICE] updateComment(): ', updated);
    return updated
  }

}

export const commentsService = new CommentsService();