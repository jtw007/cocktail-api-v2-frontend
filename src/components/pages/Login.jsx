import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

const Login = ({ currentUser, setCurrentUser }) => {
    // state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

    // submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post form data to the backend
			const reqBody = {
				email, 
				password
			}
            const serverUrl = import.meta.env.VITE_API_SERVER_URL
			const response = await axios.post(`${serverUrl}/api-v1/users/login`, reqBody)

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
        <div className='sm:my-[100px] md:my-[200px] lg:my-[300px] flex flex-col items-center justify-center sm:h-full'>
            <div className='shadow-2xl flex flex-col p-4 my-10 rounded-3xl border-[5px] border-[#d72d5c] bg-slate-100/[.85] items-center sm:w-[375px] md:w-[450px]'>
                <div className='flex flex-col'>
                    <p className='text-2xl font-bold text-center my-2'>Login</p>
                    <p className='text-lg font-bold text-red-600'>{msg}</p>
                </div>

                <form className='flex flex-col items-center'
                onSubmit={handleSubmit}>
                    <input
                        className='p-2 my-3 flex w-full rounded-full text-lg text-black border-4 border-[#0000a3]'
                        type='email'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        className='p-2 flex w-full rounded-full text-lg text-black border-4 border-[#0000a3] '
                        type='password'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />

                    <button className='bg-[#0000a3] text-white rounded-md font-medium w-[150px] ml-4 my-6 px-6 py-3 hover:bg-[#0606ff]' type='submit' id='login-btn'>Login</button>
                    <div className='font-bold md:text-xl'>
                        Don't have an account? <Link className='text-blue-900' to={'/register'}>Register here</Link> 
                    </div>
                </form>
            </div>
            

        </div>
    )
}

export default Login