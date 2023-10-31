import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

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
				setMsg(error.response.data.msg)
			}
		}
    }

    //conditionally render a navigate component
    if (currentUser) {
        return <Navigate to='/profile' />
    }
	
    return (
        <div className='sm:my-[100px] md:my-[200px] lg:my-[300px] flex flex-col items-center justify-center sm:h-full'>
			<div className='shadow-2xl flex flex-col p-4 my-10 rounded-3xl border-[5px] border-[#d72d5c] bg-slate-100/[.85] items-center sm:w-[375px] md:w-[450px]'>
				<div className='flex flex-col'>
					<p className='text-2xl font-bold text-center my-2'>Register</p>
					<p className='text-lg font-bold text-red-600'>{msg}</p>
				</div>

				<form className='flex flex-col items-center'
				onSubmit={handleSubmit}>
					<input 
						className='p-2 my-3 flex w-full rounded-full text-lg text-black border-4 border-[#0000a3]'
						type='text'
						id='username'
						placeholder='Username'
						onChange={e => setuserName(e.target.value)}
						value={userName}
						required
					/>

					<input 
						className='p-2 my-3 flex w-full rounded-full text-lg text-black border-4 border-[#0000a3]'
						type="email"
						id="email"
						placeholder='Email'
						onChange={e => setEmail(e.target.value)}
						value={email}
						required
					/>

					<input 
						className='p-2 my-3 flex w-full rounded-full text-lg text-black border-4 border-[#0000a3]'
						type="password"
						id="password"
						placeholder='Password'
						onChange={e => setPassword(e.target.value)}
						value={password}
						required
					/>

					<button className='bg-[#0000a3] text-white rounded-md font-medium w-[150px] ml-4 my-6 px-6 py-3 hover:bg-[#0606ff]' type="submit" id='register-btn'>Register</button>
					<div className='font-bold md:text-xl'>
                        Already have an account? <Link className='text-blue-900' to={'/login'}>Login here</Link> 
                    </div>

				</form>
			</div>
            
        </div>
    )
}

export default Register