import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import navImg from '../assets/cocktails.png'

const NavBar = ({ currentUser, handleLogout }) => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    const closeNav = () => {
        setNav(false)
    }

    {/* if the user is logged in... */}
    const loggedIn = (
		<ul className='hidden md:flex'>
            <li className='p-4 text-lg'>
                <Link to='/'>Home</Link>
            </li>
			<li className='p-4 text-lg'>
                <Link to="/profile">Profile</Link>
            </li>
			<li className='p-4 text-lg'>
                <Link to="/"><span onClick={handleLogout}>Logout</span></Link>
            </li>
		</ul>
	 )

     {/* if the user is not logged in... */}
	 const loggedOut = (
		<ul className='hidden md:flex'>
            <li className='p-4 text-lg'>
                <Link to='/'>Home</Link>
            </li>
            <li className='p-4 text-lg'>
                <Link to="/register">Register</Link>
                </li>
            <li className='p-4 text-lg'>
                <Link to="/login">Login</Link>
            </li>
		</ul>
	 )

    return (
        <div className='flex justify-between items-center h-24 w-full mx-auto px-10 text-white bg-[#0000a3] shadow-md'>
            < a href='/'>
                <div className='flex flex-row h-24 items-center'>
                    <img className='w-[60px] h-[60px] sm:pr-2' src={navImg} alt='img' />
                    <h1 className='text-3xl md:pl-3 font-bold text-[#b501fb]'>Brand Name
                    </h1>
                </div>
            </a>
            
            {currentUser ? loggedIn : loggedOut}
            {/* the hamburger menu for the navbar only shows on smaller screens */}
            <div onClick={handleNav} className='block md:hidden'>
                {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} /> }
            </div>
            <ul className={loggedIn && nav ? 'fixed top-24 left-0 w-full h-full overflow-hidden ease-in-out duration-500 border-r-black-900 bg-[#0000a3] md:hidden' : 'ease-in-out duration-500 fixed top-[-100%]'}>
                <li className='py-10 text-center w-full'>
                    <Link to='/' onClick={closeNav}>Home</Link>
                </li>
                <li className='py-10 text-center w-full'>
                    <Link to="/" onClick={closeNav}><span onClick={handleLogout}>Logout</span></Link>
                </li>
                <li className='py-10 text-center w-full'>
                    <Link to="/profile" onClick={closeNav}>Profile</Link>
                </li>
            </ul>

            <ul className={loggedOut && nav ? 'fixed top-24 left-0 w-full h-full overflow-hidden ease-in-out duration-500 border-r-black-900 bg-[#0000a3] md:hidden' : 'ease-in-out duration-500 fixed top-[-100%]'}>
                <li className='py-10 text-center w-full'>
                    <Link to='/' onClick={closeNav}>Home</Link>
                </li>
                <li className='py-10 text-center w-full'>
                    <Link to="/register" onClick={closeNav}>Register</Link>
                    </li>
                <li className='py-10 text-center w-full'>
                    <Link to="/login" onClick={closeNav}>Login</Link>
                </li>
            </ul>

        </div>
    )
}

export default NavBar