import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

const Login = () => {
    // state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

    // submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			// const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	// if (currentUser) {
	// 	return <Navigate to="/profile" />
	// }

    return (
        <div>
            <p className=''>Log into your account</p>
            <div className=''>
                <p className=''>{msg}</p>
            </div>

            <div className=''>
                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Email'
                        onchange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        onchange={e => setEmail(e.target.value)}
                        value={password}
                    />

                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login