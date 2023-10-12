import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = ({ currentUser, handleLogout }) => {
    const navigate = useNavigate()

    //useEffect for getting the user data and checking auth
    useEffect(() => {
        const fetchData = async () => {
            try {
                // get the token from local storage
                const token = localStorage.getItem('jwt')
                // make the auth headers
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                // hit the auth locked endpoint
                const serverUrl = import.meta.env.VITE_API_SERVER_URL
                const response = await axios.get(`${serverUrl}/api-v1/users/auth-locked`, options)
                // example POST with auth headers (options are always last argument)
                // await axios.post(url, requestBody (form data), options)

            } catch (err) {
                // if the error is a 401 -- that means that auth failed
                console.warn(err)
                if (err.response) {
                    if (err.response.status === 401) {
                        // panic!
                        handleLogout()
                        // send the user to the login screen
                        navigate('/login')
                    }
                }
            }
        }
        fetchData()
    }, []) // only fire on the first render of this component

    return (
        <div>
            <h1>Welcome, {currentUser?.username}</h1>
            <h1>Welcome, {currentUser?.email}</h1>
        </div>
    )
}

export default Profile