// Simulated Auth API with 500ms server delay simulation

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo account check (Accepts any email or standard demo credentials)
      if (password === 'demo123456' && username.length > 0) {