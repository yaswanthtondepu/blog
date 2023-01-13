import React from 'react'
import NavBar from './NavBar'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from './Error';

const Register = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        setError(null);
        const userName = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;

        let userNameRegex = /^[a-zA-Z0-9_]+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
        if(!userNameRegex.test(userName)){
            setError('Username can only contain letters, numbers and underscores');
            return;
        }
        else if( !passwordRegex.test(password)){
            setError('Password must be between 8 and 20 characters long and must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
            return;
        }
        else if(password !== password2){
            setError('Passwords do not match');
            return;
        }

        const newUser = {
            userName,
            email,
            password,
            firstName,
            lastName
        }
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/auth/signup`,
            headers: {
                'content-type': 'application/json'
            },
            data: { newUser}
        })
            .then(result => {
                console.log(result.data);
                if (result.data.msg) {
                    //setLoaded(true);
                    document.getElementById("register-form").reset();
                    alert('Signup success. You will be redirected to login page');
                    setTimeout(() => {
                        navigate("/login")
                    }, 500)
                }
                else if (result.data.error) {
                    if(result.data.error.code === 1){
                        setError('Username already exists');
                        return;
                    }
                    else if(result.data.error.code === 2){
                        setError('Email already exists');
                        return;
                    }
                    else if(result.data.error.code === 3){
                        setError('Something went wrong. Please try again later');
                        return;
                    }
                }
                else{
                    setError('Something went wrong. Please try again later');
                    return;
                }
            })
            .catch(error => console.log(error));

    }

    return (
        <>
            <NavBar />
            <div className='register'>
                <div className='register-form'>
                    <div className='register-form-header'>
                        <h3>Register</h3>
                    </div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem 0"}}>
                        {error && <Error msg={error} />}
                    </div>
                    <div className='register-form-body'>
                        <form onSubmit={handleSubmit} id="register-form">
                            <div className='form-group'>
                                {/* <label htmlFor="firstName" >First Name</label> */}
                                <input type="text" name="firstName" placeholder='First Name' required />
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="lastName" >Last Name</label> */}
                                <input type="text" name="lastName" placeholder='Last Name' required />
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='username'>Username</label> */}
                                <input type='text' name='username' placeholder='Choose an username' required autoComplete='off' />
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='email'>Email</label> */}
                                <input type='email' name='email' placeholder='Email address' required />
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='password'>Password</label> */}
                                <input type='password' name='password' placeholder='Password' required />
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='password2'>Confirm Password</label> */}
                                <input type='password' name='password2' placeholder='Confirm Password' required />
                            </div>
                           

                            <div className='form-group flex items-center justify-center'>
                                <button className='btn btn-primary'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register