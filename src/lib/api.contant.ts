const mainEndpoint = import.meta.env.VITE_BASE_URL;

const endpoints = {
    mainEndpoint,
    auth: {
        login: mainEndpoint + "/auth/login",
        register: mainEndpoint + "/auth/register"
    }
}

export default endpoints;