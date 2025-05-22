import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';
import { createRef } from 'react';

class Form extends React.Component {
    constructor() {
        super();
        this.handleBlur=this.handleBlur.bind(this);
    }

    state = {
        name: "",
        email: "",
        date: "",
        phone: "",
        message: "",
        curr_Date: new Date().toISOString().split('T')[0],
        target_value: {
            name: true,
            email: true,
            phone: true
        }
    }

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    formValidation = () => {
        const { name, email, phone, date, message } = this.state;
        const errors={}
        let isValid = true;
        if ((!name.trim() || !email.trim() || !phone.trim() || !date.trim() || !message.trim())) {
            toast("All fields are mandatory");
        } else if(phone.length<10) {
            toast("Please enter valid phone number");
        }else if( (message.length<10)){
            toast("Please enter max 10 words in message.")
        }else{
            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (regex.test(email)) {
                console.log("Valid email address");
            } else {
                toast('Email is not valid');
                isValid = false;
            }
            
            const pattern = /^(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
            if (pattern.test(phone)) {
                console.log("Phone number is valid");
            } else {
                toast('Phone number is not valid');
                isValid = false;
            }

            const name_test = /^[a-z ,.'-]+$/i;
            if (name_test.test(name)) {
                console.log("Name is valid");
            } else {
                toast("Name is not valid");
            };
            return isValid;
        }
    }

    valid_validation=(e)=>{
        const{name, email, phone} = this.state;
        const list = e.target.name;
        if(e.target.value>0){
            this.setState({target_value:{list: true}});
        }
    }

    handleBlur=(e)=>{
        const {target_value} = this.state;
        const name = e.target.name;
        console.log(target_value[name]);
        this.setState({target_value:{list: true}}, this.valid_validation(e));
    }

    handleFocus=(e)=>{
        const {target_value} = this.state;
        const name = e.target.name;
        this.setState({target_value:{list: false}}, this.valid_validation(e));
    }

    handleClick = (e) => {
        e.preventDefault();
        const isValid = this.formValidation();
        if (isValid) {
            axios.post("http://localhost:3000/contact", this.state)
                .then((res) => {
                    console.log(res);
                    toast("Your data is saved successfully");
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        const { name, email, date, phone, message, curr_Date, target_value } = this.state;
        return (
            <div className='relative'>
                <div className='w-full h-screen flex justify-center items-center bg-pink-800 text-white relative'>

                    <div className='bg-gray-200 p-10 text-black'>
                        <h1 className='text-center text-2xl'>Contact Us</h1>
                        <form className='flex flex-col gap-5 mt-4'>
                            <div className='w-full'>
                            <input onChange={this.handleChange} value={name} className='border-1 w-full border-black p-2 outline-none' type="text" placeholder='Enter you name' name='name' maxLength="20" onBlur={(e)=>this.handleBlur(e)} onFocus={(e)=>this.handleFocus(e)}/>
                            {target_value ? <p className='text-red-600 px-2 py-1'>Email is required</p> : " "}
                            </div>
                            <div>
                            <input onChange={this.handleChange} value={email} className='border-1 w-full border-black p-2 outline-none' type="email" placeholder='Enter you email' name='email' maxLength="50" onBlur={(e)=>this.handleBlur(e)} onFocus={(e)=>this.handleFocus(e)} />
                            {target_value ? <p className='text-red-600 px-2 py-1'>Email is required</p> : " "}
                            </div>
                            <input onChange={this.handleChange} value={date} className='border-1 w-full border-black p-2 outline-none' type="date" placeholder='Enter you date' name='date' max={curr_Date} />
                            <div>
                            <div className='border-1 border-black p-2 flex items-center gap-1 '><p className='text-gray-500'>+91</p><input onChange={this.handleChange} value={phone} className='outline-none' type="text" placeholder='Enter you phone' name='phone' maxLength="10" required onBlur={(e)=>this.handleBlur(e)} onFocus={(e)=>this.handleFocus(e)}/></div>
                            {target_value ? <p className='text-red-600 px-2 py-1'>Email is required</p> : " "}
                            </div>
                            <div className='border-1 border-black p-2'><textarea onChange={this.handleChange} value={message} className='outline-none w-full resize-none' name="message" rows="8" cols="8" placeholder='Enter your message here...' maxLength="500" wrap="true"></textarea><p className='float-right text-gray-500'>{message.length}/500</p></div>
                            <button onClick={this.handleClick} className='p-4 bg-black text-white'>Contact us</button>
                        </form>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </div>
        )
    }

}

export default Form;
