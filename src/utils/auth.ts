const TOKEN_KEY = 'Token'

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token: string) => {
    return localStorage.setItem(TOKEN_KEY, token)
}

const removeToken = () => {
    return localStorage.removeItem(TOKEN_KEY)
}

export { getToken, setToken, removeToken }
