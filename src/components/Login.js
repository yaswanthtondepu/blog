import React from 'react'
import NavBar from './NavBar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Error from './Error'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
var Loader = require('react-loader');

const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {
        document.title = 'Login';
        if (sessionStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);
    function handleSubmit(e) {
        setLoaded(false);
        e.preventDefault();
        setError(null);
        const email = e.target.email.value;
        const password = e.target.password.value;

        const User = {
            email,
            password
        }
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/auth/signin`,
            headers: {
                'content-type': 'application/json'
            },
            data: { User }
        })
            .then(result => {
                setLoaded(true);
                console.log(result.data);
                if (result.data.msg) {
                    //setLoaded(true);
                    document.getElementById("login-form").reset();
                    result.data.user = JSON.stringify(result.data.user);
                    sessionStorage.setItem('user', result.data.user);
                    navigate("/")
                }
                else if (result.data.error) {
                    if (result.data.error.code === 1) {
                        setError('Please check your email address');
                        return;
                    }
                    else if (result.data.error.code === 2) {
                        setError('Please check your password');
                        return;
                    }
                    else if (result.data.error.code === 3) {
                        setError('Something went wrong. Please try again later');
                        return;
                    }
                }
                else {
                    setError('Something went wrong. Please try again later');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                setLoaded(true);
                setError('Something went wrong. Please try again later');
                return;
            }
            );

    }

    function signInWithGoogle() {
        axios.get(`${process.env.REACT_APP_URL}/auth/login/federated/google`)
            .then(result => {
                console.log(result.data);
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <NavBar />
            <div className='register'>

                <div className='register-form'>
                    <div className='register-form-header'>
                        <GoogleButton
                            onClick={signInWithGoogle}
                        />
                    </div>
                    <div className='register-form-header'>
                        <h3>Login</h3>
                    </div>
                    {error &&
                        <div className='error'>
                            <div style={{ padding: "0 0.5rem" }}>
                                <Error msg={error} />
                            </div>
                        </div>}
                    <div className='register-form-body'>
                        <form onSubmit={handleSubmit} id="login-form">
                            <Loader loaded={loaded} />
                            <div className='form-group'>
                                {/* <label htmlFor='email'>Email</label> */}
                                <input type='email' name='email' placeholder='Email address' required autoComplete='nope' />
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='password'>Password</label> */}
                                <input type='password' name='password' placeholder='Password' required autoComplete='nope' />
                            </div>

                            <div className='form-group flex items-center justify-center'>
                                <button className='btn btn-primary'>Login</button>
                            </div>
                        </form>
                    </div>

                    <div className='form-group'>
                        <div style={{ paddingTop: "1rem" }}>
                            Don't have an account? <Link to='/register' className='color-blue'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login