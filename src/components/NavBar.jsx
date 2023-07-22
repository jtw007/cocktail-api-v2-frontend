import React from 'react'

const NavBar = ({ currentUser, handleLogout }) => {
    

    return (
    <nav className=''>
        <div className=''>
            <a className='' href='/'>Home</a>
            <a className='' href='/profile'>Profile</a>
        </div>
    </nav>
    )
}

export default NavBar