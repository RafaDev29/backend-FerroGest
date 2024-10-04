const login = async (username, password) => {
    // Aquí iría la lógica real para autenticarse contra la base de datos.
    // Simularemos una respuesta de autenticación.
    
    if (username === 'admin' && password === 'password123') {
        return {
            message: 'Login successful',
            data: { username },
            status: true
        };
    } else {
        return {
            message: 'Invalid credentials',
            data: null,
            status: false
        };
    }
};

module.exports = { login };
