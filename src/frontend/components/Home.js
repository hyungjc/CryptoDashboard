import React, {useState} from 'react';
import {Container, Form, Button, Card, Stack} from 'react-bootstrap'
import { render } from 'react-dom';


const Home = () => {
        const [status, changeStatus] = useState(false)

        


        

        if (!status) {
                return (
                        <Container className = "d-flex align-items-center justify-content-center"
                               style = {{ minHeight: "100vh" }}>
                                <div className="gap-5">
                        
                                <h1 className = "text-center mb-4" >Crypto Dashboard</h1>
                                <Stack direction = "vertical" gap = {2}>
                                        <Stack direction = "horizontal" gap = {2}>
                                                <Button href = "/login" variant="primary" className = "w-50" type = "submit">Login</Button>
                                                <Button href = "/signup" variant="success" className = "w-50" type = "submit">Signup</Button>
                                        </Stack>
                                                    
                                        {/* <Button variant = "success" variant="warning" className = "w-100" type = "submit">Connect to MetaMask</Button> */}
                                </Stack>
                        </div>
                            </Container>
                );
        }
        else {
                return( 
                        <div>Welcome</div>
                )
               
        }
                        
}


export default Home;
