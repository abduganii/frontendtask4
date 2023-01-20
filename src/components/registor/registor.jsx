import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useToken from '../../Hooks/useToken.js';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';

function Registor() {
    const [, setToken] = useToken();
    const [status, setStatus] = useState(0);
    const login = useRef();
    const password = useRef();
    const name = useRef();
    const navigate = useNavigate()

    const loginSubmit = (e) => {
        e.preventDefault();
        (async () => {
            try {
                const res = await fetch("https://backend-bkgm.onrender.com/auth/registor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.current.value,
                        email: login.current.value,
                        password: password.current.value,
                    }),
                });
                const data = await res.json();
                setStatus(data.status);
                setToken(data.token);
                if (data.token) {
                    navigate("/")
                }
            } catch (error) {
                console.log(error);
            }
        })();

    };

    return (
        <div className="container login_container">
            <MDBContainer className="my-5">

                <MDBCard >
                    <MDBRow className='g-0'>

                        <MDBCol md='6'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>

                                <div className='d-flex flex-row mt-2'>
                                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                    <span className="h1 fw-bold mb-0">Logo</span>
                                </div>

                                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    id='formControlLg'
                                    required
                                    ref={name}
                                    type="text"
                                    minLength={1}
                                    placeholder="name"
                                    style={
                                        status === 404
                                            ? {
                                                border: "1px solid #D61F1F",
                                            }
                                            : {}
                                    }
                                    size="lg" />

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email address'
                                    id='formControlLg'
                                    required
                                    ref={login}
                                    type="email"
                                    placeholder="Login"
                                    style={
                                        status === 404
                                            ? {
                                                border: "1px solid #D61F1F",
                                            }
                                            : {}
                                    } size="lg" />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='formControlLg'
                                    required
                                    ref={password}
                                    minLength={1}
                                    type="password"
                                    placeholder="Parol"
                                    style={
                                        status === 401
                                            ? {
                                                border: "1px solid #D61F1F",
                                            }
                                            : {}
                                    }
                                    size="lg"
                                />

                                <MDBBtn onClick={loginSubmit} className="mb-4 px-5" color='dark' size='lg'>create account</MDBBtn>


                                <div className='d-flex flex-row justify-content-start'>
                                    <p className="small text-muted me-1">Terms of use.</p>
                                    <p className="small text-muted">Privacy policy</p>
                                </div>

                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>
            {status == 404 ? <Alert style={{ width: "100%", position: "absolute", left: 0, bottom: 0 }} key={"danger"} variant={"danger"}>
                email is already authorized
            </Alert> : ""}
        </div>
    );
}

export default Registor;
