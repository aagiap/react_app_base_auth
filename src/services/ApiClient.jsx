import {API_BASE_URL, TOKEN_KEYS, API_STATUS} from "../config/Constant"

/**
 * API utility class để xử lý tất cả các HTTP requests
 * Tự động thêm token vào header (nếu auth = true)
 * và xử lý lỗi trả về
 */
class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL
    }

    /** Lấy token từ localStorage */
    getToken() {
        return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
    }

    /**
     * Tạo headers
     * Nếu auth = true thì thêm Authorization
     */
    getHeaders(customHeaders = {}, auth = true) {
        const headers = {
            "Content-Type": "application/json",
            ...customHeaders,
        }

        if (auth) {
            const token = this.getToken()
            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }
        }

        return headers
    }

    /** Xử lý response chung */
    async handleResponse(response) {
        try {
            const data = await response.json()

            if (data.status !== API_STATUS.EXCEPTION) {
                return data
            } else {
                console.error("Exception from server:", data)

                window.location.href = "/error"

                throw new Error(data.message || "Server exception")
            }
        } catch (error) {
            console.error("Error parsing response JSON:", error)
            throw error
        }
    }

    /** GET */
    async get(endpoint, options = {}) {
        const {headers = {}, auth = true, ...rest} = options

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "GET",
                headers: this.getHeaders(headers, auth),
                ...rest,
            })
            return await this.handleResponse(response)
        } catch (error) {
            console.error("GET request failed:", error)
            throw error
        }
    }

    /** POST */
    async post(endpoint, body = {}, options = {}) {
        const {headers = {}, auth = true, ...rest} = options

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "POST",
                headers: this.getHeaders(headers, auth),
                body: JSON.stringify(body),
                ...rest,
            })
            return await this.handleResponse(response)
        } catch (error) {
            console.error("POST request failed:", error)
            throw error
        }
    }

    /** PUT */
    async put(endpoint, body = {}, options = {}) {
        const {headers = {}, auth = true, ...rest} = options

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "PUT",
                headers: this.getHeaders(headers, auth),
                body: JSON.stringify(body),
                ...rest,
            })
            return await this.handleResponse(response)
        } catch (error) {
            console.error("PUT request failed:", error)
            throw error
        }
    }

    /** DELETE */
    async delete(endpoint, options = {}) {
        const {headers = {}, auth = true, ...rest} = options

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "DELETE",
                headers: this.getHeaders(headers, auth),
                ...rest,
            })
            return await this.handleResponse(response)
        } catch (error) {
            console.error("DELETE request failed:", error)
            throw error
        }
    }
}

export default new ApiClient()
