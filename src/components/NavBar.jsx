import { Link } from 'react-router-dom'

const NavBar = ({ currentUser, handleLogout }) => {
    const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile">
				Profile
			</Link>
		</>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				Register
			</Link>

			<Link to="/login">
				Login
			</Link>
		</>
	 )

    return (
    <nav className=''>
        <div className=''>
            <a className='' href='/'>Home</a>
            <a className='' href='/profile'>Profile</a>
            <a className='' href='/login'>Login</a>
        </div>

        {currentUser ? loggedIn : loggedOut}
    </nav>
    )
}

export default NavBar