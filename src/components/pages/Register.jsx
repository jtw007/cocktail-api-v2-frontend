import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

const Register = ({ currentUser, setCurrentUser }) => {
    // state for the controlled form
	const [userName, setuserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

    // submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				userName,
				email, 
				password
			}
			const serverUrl = import.meta.env.VITE_API_SERVER_URL
			const response = await axios.post(`${serverUrl}/api-v1/users/register`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (error) {
			console.warn(error)
			if (error.response) {
				setMsg(`${error.response.data.msg}`)
			}
		}
    }

    //conditionally render a navigate component
    if (currentUser) {
        return <Navigate to='/profile' />
    }
	
    return (
        <div id='register-container'>
            <div id='register-message'>
                <p>Register for an account:</p>

                <p>{msg}</p>
            </div>

            <form onSubmit={handleSubmit} id='register-form'>
                <label htmlFor='username'>Username:</label>
                <input 
                    type='text'
                    id='username'
                    placeholder='Username'
                    onChange={e => setuserName(e.target.value)}
                    value={userName}
                    required
                />

                <label htmlFor='email'>Email:</label>
                <input 
                    type="email"
					id="email"
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
					value={email}
					required
                />

                <label htmlFor='password'>Password:</label>
				<input 
					type="password"
					id="password"
					placeholder='Password'
					onChange={e => setPassword(e.target.value)}
					value={password}
					required
				/>

                <button type="submit" id='register-btn'>Register</button>
                <div id="register-login">
					<p>Already have an account? <a href='/login'>Login here</a></p>
				</div>

            </form>

        </div>
    )
}

export default Register