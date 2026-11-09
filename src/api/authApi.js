// Simulated Auth API with 500ms server delay simulation

export const login = (username, password) => {
    return new Promise((resolve, reject) => {