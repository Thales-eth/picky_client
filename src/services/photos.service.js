import InitAxios from "./init.service"

class PhotosService extends InitAxios {
    constructor() {
        super('photos')
    }

    getAllPhotos() {
        return this.api.get('/list').then(({ data }) => data)
    }

    getLikedPhotos(user_id) {
        return this.api.get(`/list/likedPhotos/${user_id}`).then(({ data }) => data)
    }

    getPersonalPhotos(user_id) {
        return this.api.get(`/list/personalPhotos/${user_id}`).then(({ data }) => data)
    }

    getOnePhoto(photo_id) {
        return this.api.get(`/getOnePhoto/${photo_id}`).then(({ data }) => data)
    }

    // POR COMPROBAR
    uploadPhoto(body, token) {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return this.api.post('/upload', body, { headers }).then(({ data }) => data)
    }

    uploadAvatar(body) {
        return this.api.post('/uploadAvatar', body).then(({ data }) => data)
    }


    editPhoto(photo_id, body) {
        return this.api.put(`/edit/${photo_id}`, body).then(({ data }) => data)
    }

    deletePhoto(photo_id) {
        return this.api.delete(`/delete/${photo_id}`).then(({ data }) => data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PhotosService()
        }

        return this.instance
    }
}

export default PhotosService.getInstance()