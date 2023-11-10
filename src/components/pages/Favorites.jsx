import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'

const Favorites = () => {
    const [fave, setFave] = useState()

    const navigate = useNavigate()
    //localStorage = web storage object that allows JS sites and apps to keep key-value pairs in web browser with no expiration date; enables developers to store and retrieve data in the browser - not good practice since data will be lost if the user clears cache
        //in this case, we are storing the jwt 
    const token = localStorage.getItem('jwt')
    if(!token) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                //get token from local storage
                const token = localStorage.getItem('jwt')
                // hit the auth locked endpoint
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api-v1/favorites`, {headers: {'Authorization': token}})
                setFave(response.data)
                // console.log(response.data, 'hey')
            } catch(error) {
                // if error message is 401, means auth failed
                console.warn(error)
                if (error.response) {
                    if (error.response.status === 401) {
                        // send user to login page
                        navigate('/login')
                    }
                }
            }
        }
        fetchData()
    }, [])

    return (
        <div className=''>
            <h1>Favorites</h1>
        </div>
    )
}

export default Favorites