import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'

const NavBar = ({ currentUser, handleLogout }) => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    {/* if the user is logged in... */}
    const loggedIn = (
		<ul className='hidden md:flex'>
            <li className='p-4'>
                <Link to='/'>Home</Link>
            </li>
			<li className='p-4'>
                <Link to="/"><span onClick={handleLogout}>Logout</span></Link>
            </li>
			<li className='p-4'>
                <Link to="/profile">Profile</Link>
            </li>
		</ul>
	 )

     {/* if the user is not logged in... */}
	 const loggedOut = (
		<ul className='hidden md:flex'>
            <li className='p-4'>
                <Link to='/'>Home</Link>
            </li>
            <li className='p-4'>
                <Link to="/register">Register</Link>
                </li>
            <li className='p-4'>
                <Link to="/login">Login</Link>
            </li>
		</ul>
	 )

    return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-[#904343]'>
        <h1 className=''>
            <a className='w-full text-2xl font-bold text-[#00df]' href='/'>Brand Name</a>
        </h1>

        {currentUser ? loggedIn : loggedOut}
         {/* the hamburger menu for the navbar only shows on smaller screens */}
         <div onClick={handleNav} className='block md:hidden'>

         </div>
    </div>
    )
}

export default NavBar