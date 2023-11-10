import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Faves = () => {
    const [fave, setFave] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                //get token from local storage
                const token = localStorage.getItem('jwt')
                // hit the auth locked endpoint
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api-v1/favorites`, {headers: {'Authorization': token}})
                setFave(response.data)
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
    })

    return (
        <div className=''>
            <h1>Favorites</h1>
        </div>
    )
}

export default Faves