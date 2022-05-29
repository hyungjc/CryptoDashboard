import React from 'react'
import { Button, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import httpClient from '../../httpClient'
import {useEffect, useState} from 'react'
import Korbitchart from './Korbitchart'
// import Cookies from 'universal-cookie'
//import APIService from './APIKorbit'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const Dashboard = () => {

        const logOut = async() => {
                await httpClient.post("//localhost:5000/logout");
                window.location.href = "/";
        }

        // const cookies = new Cookies();
        // console.log(cookies.get("session"))


        const [user, setUser] = useState("")
        const [myData, setData] = useState()
        

        useEffect(() => {


                const fetch = async() => {
                        try{

                                const resp = await httpClient.get("//localhost:5000/@me")
                                const access = await httpClient.get("//localhost:5000/dashboard")
                                setUser(resp.data)
                                setData(access.data)
                                console.log(resp.data)
                                console.log(access.data)
                        }
                        catch(error) {
                                if (error.response.status === 401){
                                        alert("Please login")
                                        window.location.href = ("/")
                                }

                                else if (error.response.status === 500)
                                        console.log("Incorrect")
                        }
                        

                }
                fetch()
                // make sure to catch any error
                .catch(console.error);
            }, [])

        //     const [myData, setData] = useState("")
        //     useEffect(() => {
        //             fetch('//localhost:5000/dashboard').then(
        //                     response => console.log(response.data)
        //             ).then(data => console.log(data.data))
        //     }, []);
        
        //         (async() => {
                        
        //                         const resp = await httpClient.get("//localhost:5000/@me");
        //                         setUser(resp.data)
        //                         console.log(resp.data)
                        
        //                 }
        // )
// }


  return (
          <>
          <Navbar bg = "dark" variant = "dark">
                <Container>
                        
                        <Navbar.Brand href = "#">Dashboard</Navbar.Brand>
                
                </Container>

                

                <Nav className = "ms-auto">
                        <NavDropdown title = {user.email}>
                                <NavDropdown.Item onClick = {() => logOut()}>Logout</NavDropdown.Item>
                        {/* <Button className = "w-100" type = "button" onClick = {() => logOut()}>LogOut</Button> */}
                        </NavDropdown>
                </Nav>
        </Navbar>

        <div className = "App">
                <div className = "container">
                        <Korbitchart/>
                </div>
        
        </div>
        {/* // <p>{myData.access}</p> */}
          
          </>
          
          
        //   <div>{user != null ? (
        //           <>
        //         <h1>logged in</h1>
        //         <Button className = "w-100" type = "button" onClick = {() => logOut()}>LogOut</Button>
        //         </>
        // ) :  <h1>Not logged in</h1>}
        
        // </div>
    
    
    
  )
}

export default Dashboard