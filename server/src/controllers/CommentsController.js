import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getComments)
      .get('/:commentId', this.getCommentById)
      // 🔽 REQUIRES AUTHENTICATION 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .put('/:commentId', this.updateComment)
      .delete('/:commentId', this.removeComment)
  }

  async getComments(req, res, nxt) {
    try {
      const comments = await commentsService.getComments(req.query);
      return res.send(comments)
    } catch (error) {
      nxt(error)
    }
  }

  async getCommentById(req, res, nxt) {
    try {
      const comments = await commentsService.getCommentById(req.params.commentId);
      return res.send(comments)
    } catch (error) {
      nxt(error)
    }
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createComment(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id
      const comments = await commentsService.createComment(req.body);
      return res.send(comments)
    } catch (error) {
      nxt(error)
    }
  }

  async updateComment(req, res, nxt) {
    try {
      const toBeUpdated = await commentsService.updateComment(req.params.commentId, req.body, req.userInfo.id);
      return res.send(toBeUpdated)
    } catch (error) {
      nxt(error)
    }
  }

  async removeComment(req, res, nxt) {
    try {
      const toBeDeleted = await commentsService.removeComment(req.params.commentId, req.userInfo.id);
      return res.send(toBeDeleted)
    } catch (error) {
      nxt(error)
    }
  }

}