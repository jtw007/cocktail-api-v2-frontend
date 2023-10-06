import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

const Login = ({ currentUser, setCurrentUser}) => {
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
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)

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
	if (currentUser) {
		return <Navigate to="/profile" />
	} 

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
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />

                    <button type='submit' id='login-btn'>Login</button>
                    <div id="login-register">
                        {/* <p>Don't have an account? Sign up <a href='/register'>here</a></p> */}
                        Don't have an account? <Link to={'/register'}>Register here</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login