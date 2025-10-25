import { API_BASE_URL, TOKEN_KEYS } from "../config/constants"

/**
 * API utility class để xử lý tất cả các HTTP requests
 * Tự động thêm token vào header và xử lý lỗi
 */
class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL
    }

    /**
     * Lấy token từ localStorage
     */
    getToken() {
        return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
    }

    /**
     * Tạo headers với token
     */
    getHeaders(customHeaders = {}) {
        const headers = {
            "Content-Type": "application/json",
            ...customHeaders,
        }

        const token = this.getToken()
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        return headers
    }

    /**
     * Xử lý response
     */
    async handleResponse(response) {
        const data = await response.json()

        if (!response.ok) {
            const error = new Error(data.message || "API request failed")
            error.status = response.status
            error.data = data
            throw error
        }

        return data
    }

    /**
     * GET request
     */
    async get(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "GET",
                headers: this.getHeaders(options.headers),
                ...options,
            })

            return await this.handleResponse(response)
        } catch (error) {
            console.error("GET request failed:", error)
            throw error
        }
    }

    /**
     * POST request
     */
    async post(endpoint, body = {}, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "POST",
                headers: this.getHeaders(options.headers),
                body: JSON.stringify(body),
                ...options,
            })

            return await this.handleResponse(response)
        } catch (error) {
            console.error("POST request failed:", error)
            throw error
        }
    }

    /**
     * PUT request
     */
    async put(endpoint, body = {}, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "PUT",
                headers: this.getHeaders(options.headers),
                body: JSON.stringify(body),
                ...options,
            })

            return await this.handleResponse(response)
        } catch (error) {
            console.error("PUT request failed:", error)
            throw error
        }
    }

    /**
     * DELETE request
     */
    async delete(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "DELETE",
                headers: this.getHeaders(options.headers),
                ...options,
            })

            return await this.handleResponse(response)
        } catch (error) {
            console.error("DELETE request failed:", error)
            throw error
        }
    }
}

// Export singleton instance
export default new ApiClient()
