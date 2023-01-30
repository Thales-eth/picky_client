import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersService from '../services/users.service'

const AuthContext = createContext()

const AuthProviderWrapper = (props) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const getToken = () => {
        const token = localStorage.getItem('authToken')
        return token
    }

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            UsersService
                .getLoggedUser(token)
                .then(user => {
                    setUser(user)
                    setIsLoading(false)
                })
                .catch(e => console.log(e))
        }


        else if (window.location.pathname !== '/'
            && window.location.pathname !== '/register') {
            console.log(window.location.pathname)
            navigate('/login')
        }
    }

    const logoutUser = () => {
        setUser(null)
        setIsLoading(false)
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoading, setIsLoading, storeToken, getToken, user, setUser, logoutUser, authenticateUser }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export { AuthContext, AuthProviderWrapper }