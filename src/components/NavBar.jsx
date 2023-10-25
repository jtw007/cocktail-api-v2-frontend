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
        <div className='flex justify-between items-center h-24 max-w-[1240px]w-full mx-auto px-10 text-white bg-[#904343]'>
            <h1 className='w-full text-3xl font-bold text-[#00df]'>
                <a className='' href='/'>Brand Name</a>
            </h1>

            {currentUser ? loggedIn : loggedOut}
            {/* the hamburger menu for the navbar only shows on smaller screens */}
            <div onClick={handleNav} className='block md:hidden'>
                {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} /> }
            </div>
            <ul className={loggedIn && nav ? 'fixed left-0 top-[10%] w-full h-0 overflow-hidden ease-in-out duration-500 border-r border-r-gray-900 bg-[#000300]' : 'ease-in-out duration-500 fixed top-[-100%] w-full h-0 overflow-hidden'}>
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

            <ul className={loggedOut && nav ? 'fixed left-0 top-[10%] w-full h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 md:hidden' : 'ease-in-out duration-500 fixed top-[-100%]'}>
                <li className='p-4 border-b border-gray-600'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='p-4 border-b border-gray-600'>
                    <Link to="/register">Register</Link>
                    </li>
                <li className='p-4 border-b border-gray-600'>
                    <Link to="/login">Login</Link>
                </li>
            </ul>

        </div>
    )
}

export default NavBar