import React from 'react'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <ul className='flex bg-gray-800 text-white gap-[10%] justify-center text-3xl p-10'>
                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"/service"}><li>Services</li></Link>
                    <Link to={"/client"}><li>Our Client</li></Link>
                    <Link to={"/contact"}><li>Contact us</li></Link>
                </ul>
            </div>
        )
    }
}

export default Navbar;
