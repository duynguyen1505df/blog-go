import api from './axiousInstance'

class Api {
    async get(url: string, config = {}) {
        try {
            const response = await api.get(url, config);
            return response.data;
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }
    async deleteById(url: string, id: number) {
        try {
            const result = await api.delete(`${url}/${id}`)
            if (result == null) return null
            return result
        } catch (error: any) {
            console.log(error)
            return error.response.data
        }
    }

    async putAPI(url: string, data: any) {
        try {
            const response = await api.patch(`${url}`, data)
            if (response == null) return null
            return response
        } catch (error: any) {
            console.log(error)
            return error.response.data
        }
    }
    async postAPI(url: string, data: any) {
        try {
            const response = await api.post(`${url}`, data)
            if (response == null) return null
            return response
        } catch (error: any) {
            console.log(error)
            return error.response.data
        }
    }

    async postLogOut(url: string) {
        try {
            const response = await api.post(`${url}`, {})
            if (response == null) return null
            return response
        } catch (error: any) {
            console.log(error)
            return error.response.data
        }
    }
}
export default Api
