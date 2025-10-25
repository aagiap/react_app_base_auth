// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

// API Endpoints
export const API_ENDPOINTS = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    GET_USER: "/auth/user",
}

// Token Keys
export const TOKEN_KEYS = {
    ACCESS_TOKEN: "authToken",
    REFRESH_TOKEN: "refreshToken",
}

// Role Constants
export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    USER: "ROLE_USER",
}

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}
