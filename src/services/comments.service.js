import InitAxios from "./init.service"

class CommentsService extends InitAxios {
    constructor() {
        super('comments')
    }

    getCommentedPhoto(photo_id) {
        return this.api.get(`/list/${photo_id}`).then(({ data }) => data)
    }

    getSingleComment(comment_id) {
        return this.api.get(`/getComment/${comment_id}`).then(({ data }) => data)
    }

    // POR COMPROBAR
    postComment(photo_id, token, body) {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return this.api.post(`/create/${photo_id}`, body, { headers }).then(({ data }) => data)
    }

    editComment(comment_id, body) {
        return this.api.put(`/edit/${comment_id}`, body).then(({ data }) => data)
    }

    deleteComment(comment_id, photo_id) {
        return this.api.delete(`/delete/${comment_id}/${photo_id}`).then(({ data }) => data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CommentsService()
        }

        return this.instance
    }
}

export default CommentsService.getInstance()