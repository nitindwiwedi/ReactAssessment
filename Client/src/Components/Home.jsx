import React from 'react'
import Navbar from './Navbar';

class Home extends React.Component {
    render() {
        return (
            <>
                <div className={`h-screen w-full bg-[url(../../public/bgImg.jpeg)] bg-cover bg-center 2w-full flex justify-start p-40 text-7xl leading-[1.5] tracking-wider text-white items-center`}>
                    <h1>Welcome to <br></br>WebJunction</h1>
                </div>
            </>
        )
    }
}

export default Home;