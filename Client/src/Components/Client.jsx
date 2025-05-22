import React from 'react'
import axios from 'axios'
import Navbar from './Navbar';

class Client extends React.Component {
    state = {
        arr: []
    };

    fetchData = () => {
        axios.get("http://localhost:3000/client")
            .then((res) => {
                this.setState({arr: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.fetchData();

    }
    render() {
        console.log(this.state);
        return (
            <div className='overflow-hidden'>
            <div className='p-5'>
                <h1 className='text-center text-2xl'>Our Clients</h1>
                <table className='w-full h-full mt-[2%]'>
                    <thead className='p-2'>
                        <tr>
                        <th className='bg-gray-600 text-white text-left padding-[8px] px-6 py-4'>Company</th>
                        <th className='bg-gray-600 text-white text-left padding-[8px] px-6 py-4'>Contact</th>
                        <th className='bg-gray-600 text-white text-left padding-[8px] px-6 py-4'>Country</th>
                        <th className='bg-gray-600 text-white text-left padding-[8px] px-6 py-4'>Country</th>
                        <th className='bg-gray-600 text-white text-left padding-[8px] px-6 py-4'>Country</th>
                        </tr>
                    </thead>
                    {
                        this.state.arr?.map((e, i) => {
                            return (
                                <tbody key={i} className='bg-[#dddddd]'>
                                    <tr>
                                    <td className='border-1 border-[#dddddd] text-left padding-[8px] px-6 py-4 break-all'>{e.name}</td>
                                    <td className='border-1 border-[#dddddd] text-left padding-[8px] px-6 py-4 break-normal'>{e.email}</td>
                                    <td className='border-1 border-[#dddddd] text-left padding-[8px] px-6 py-4 break-normal'>{new Date(e.date).toLocaleDateString()}</td>
                                    <td className='border-1 border-[#dddddd] text-left padding-[8px] px-6 py-4 break-normal'>{e.phone}</td>
                                    <td className='border-1 border-[#dddddd] text-left padding-[8px] px-6 py-4 break-all'>{e.message}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
            </div>
        )
    }
}

export default Client;
