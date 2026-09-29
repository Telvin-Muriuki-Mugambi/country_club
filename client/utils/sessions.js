const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const ADMIN_SESSION_KEY = "country-club-admin-session";
const ADMIN_SESSION_DURATION = 8 * 60 * 60 * 1000;

export function createAdminSession(email) {
    const session = {
        email,
        role: "admin",
        expiresAt: Date.now() + ADMIN_SESSION_DURATION
    };

    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return session;
}

export function getAdminSession() {
    const storedSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!storedSession) return null;

    try {
        const session = JSON.parse(storedSession);
        if (
            !session ||
            typeof session.email !== "string" ||
            session.role !== "admin" ||
            !Number.isFinite(session.expiresAt) ||
            session.expiresAt <= Date.now()
        ) {
            clearAdminSession();
            return null;
        }
        return session;
    } catch {
        clearAdminSession();
        return null;
    }
}

export function clearAdminSession() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

const APIClient = {

    __headers() {
        return {
            "Content-Type": "application/json",
            ...(localStorage.getItem("token") ? {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            } : {})
        }
    },

    /**
     * 
     * @param {*} path /Resource
     */
    async get(path) { // /tasks | /users
        // syncronous
        const response = await fetch(`${BASE_URL}${path}`, { headers: this.__headers() });
        // Handle network errors or server errors
        if (!response.ok) throw new Error(response.statusText);
        const responseData = await response.json();
        return responseData;

    },

    /**
     * 
     * @param {*} path // Resource
     * @param {*} payload // Data that we are saving id db
     */
    async post(path, payload) { // Resource -> /tasks | /users 
        const response = await fetch(`${BASE_URL}${path}`, {
            method: "POST",
            body: JSON.stringify(payload), // string
            headers: this.__headers()
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    },

    /**
     * 
     * @param {*} path // Resource
     * @param {*} payload // Data that we are saving id db
     */
    async patch(path, payload) { // Resource -> /tasks | /users 
        const response = await fetch(`${BASE_URL}${path}`, {
            method: "PATCH",
            body: JSON.stringify(payload), // string
            headers: this.__headers()
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    },

    /**
     * 
     * @param {*} path // Resource
     * @param {*} payload // Data that we are saving id db
     */
    async delete(path) { // Resource -> /tasks | /users 
        const response = await fetch(`${BASE_URL}${path}`, {
            method: "DELETE",
            headers: this.__headers()
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    }

}

export default APIClient;