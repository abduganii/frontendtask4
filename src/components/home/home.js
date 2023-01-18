import { useEffect, useRef, useState } from "react";
import useToken from "../../Hooks/useToken";
 import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
   
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCheckbox
} from 'mdb-react-ui-kit';

import { Button,Alert } from "react-bootstrap";


function Home() {
    const [showNavText, setShowNavText] = useState(false);
    const [token, setToken] = useToken()
    const [data, setData] = useState()
    const [block, setBlock] = useState(false)
    const [ checked, setChecked] = useState(false)
    const sec = useRef()
    const bloc = useRef()
    
    fetch(`http://localhost:7000/getme`, {
        headers: { token: token, "Content-Type": "application/json", },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.user?.blocked === true) {
                setBlock(true)
            } 
            if (data?.status == 400) {
                setToken(false)
            }
        });

    useEffect(() => {
        fetch("http://localhost:7000/users", {
            headers: { token: token, "Content-Type": "application/json", },
        })
        .then(res => res.json())
        .then(data => setData(data))
            .catch((e) => console.log(e))
        
    }, [])
  

    const HandleDelete = (e) => {
      
        const id = e.target.dataset.id;
        fetch(`http://localhost:7000/deleteUsers/${id}`, {
            method: "Delete",
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.seccess === true) {
                        sec.current.style.display = "block"
                    } bloc.current.style.display = "none"
                    if (data.status === 401 || data?.status == 400) {
                        setToken(false)
                    }
                 
                    else {
                        console.log(data.seccess);
                    }
                }
            });
    }
    const HandleBlack = (e) => {
        const id = e.target.dataset.id;
      
        fetch(`http://localhost:7000/Blockusers/${id}`, {
            method: "Put",
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.success) {
                        bloc.current.style.display = "block"
                        sec.current.style.display = "none"
                    }
                    if (data.status === 401|| data?.status == 400) {
                        setToken(false)
                    }
                    else {
    
                        console.log(data);
                    }
                }
            });
    }
    const HandleUnBlack = (e) => {
        const id = e.target.dataset.id;
        console.log(id)
        fetch(`http://localhost:7000/unBlockusers/${id}`, {
            method: "Put",
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.status === 200) {
                        console.log(data);
    
                    }
                    if (data.status === 401|| data?.status == 400) {
                        setToken(false)
                    }
                    else {
                        console.log(data);
                    }
                }
            });
    }
    const HandleDeleteAll = () => {
        fetch(`http://localhost:7000/deleteAllUsers`, {
            method: "Delete",
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.seccess === true) {
                        sec.current.style.display = "block"
                    } bloc.current.style.display = "none"
                    if (data.status === 401 || data?.status == 400) {
                        setToken(false)
                    }
                 
                    else {
                        console.log(data.seccess);
                    }
                }
            });
    }
    return (
        <>
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>LOGO</MDBNavbarBrand>
                <MDBNavbarToggler
                type='button'
                data-target='#navbarText'
                aria-controls='navbarText'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavText(!showNavText)}
                >
                <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavText}>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        Home
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
                        <span className='navbar-text'
                        onClick={() => {
                    setToken(false);
                  }}>
                  Log out</span>
                </MDBCollapse>
            </MDBContainer>
            </MDBNavbar>
            {
                block === false ? 
                <MDBTable align='middle'>
                    <MDBTableHead light>
                        <tr>
                        <th scope='col'>
                                    <MDBCheckbox onChange={(e) => {
                                        setChecked(e.target.checked)
                            }}></MDBCheckbox>
                        </th>
                        <th scope='col'>id</th>
                        <th scope='col'>name</th>
                        <th scope='col'>e-mail</th>
                        <th scope='col'>login time</th>
                        <th scope='col'>registration time</th>
                        <th scope='col'>blocked</th>
                                <th scope='col'>
                                    {
                                        checked === true ? <><Button  variant="danger">Blocked</Button><Button onClick={HandleDeleteAll} variant="outline-danger" >Delete</Button></> : ""
                                    }
                                </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    {
                            data && data.user.map(e => (
                                
                        <tr>
                        <th scope='col'>
                            <MDBCheckbox checked={checked}></MDBCheckbox>
                        </th>
                        <td>{e?._id}</td>
                        <td>{ e?.name}</td>
                        <td>{e?.email}</td>
                        <td>{e?.createdAt}</td>
                        <td>{e?.updatedAt}</td>
                        <td>{e?.blocked ===false ?"unblocked":"blocked"}</td>
                                    <td>{e?.blocked === false ? <Button  data-id={e?._id} onClick={HandleBlack} variant="danger">Blocked</Button> : <Button  data-id={e?._id} onClick={HandleUnBlack} variant="success">unblocked</Button>}  
                                        <Button variant="outline-danger"
                                        data-id={e?._id}
                                          onClick={HandleDelete}>Delete
                                          
                                    </Button>
                        </td>
                        </tr>
                    ))  
                    }
                    
                    </MDBTableBody>
                    </MDBTable> : <>
                        <h1> Your Account Blocked  </h1>
                        <p>Create new account</p>
                    </>
                
            }
             
        <Alert ref={sec}  style={{display:"none", width:"100%", position:"absolute", left:0,bottom:0} } key={"danger"} variant={"danger"}>
            User Deleted
            </Alert>
            <Alert ref={bloc}  style={{display:"none", width:"100%", position:"absolute", left:0,bottom:0} } key={"danger"} variant={"danger"}>
            User Blocked
        </Alert>
       
       </>
    );
}

export default Home;
