import {Form, Button, Card} from 'react-bootstrap'
import {useState} from 'react'
import httpClient from "../../httpClient"
import {useCookies} from "react-cookie"
import Cookies from 'universal-cookie'

const Login = () => {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        //const [cookies, setCookie] = useCookies();
        const cookies = new Cookies();
        console.log(cookies.get("session"))

        const logInUser = async () => {
                

                // const resp = await httpClient.post("//localhost:5000/login", {
                //         email,
                //         password,
                // });

                // console.log(typeof resp.data.id === "undefined")



                // if (typeof resp.data.id !== "undefined") {
                //         window.location.href = "/dashboard"
                // }

                // else{
                //         alert("Invalid Credentials")
                // }

                // // console.log(resp.data.error)
                // //window.location.href = "/dashboard"

                try{
                        const resp = await httpClient.post("//localhost:5000/login", {
                                email,
                                password,
                        });

                        window.location.href = "/dashboard";

                }
                catch (error) {
                        if (error.response.status === 401){
                                alert("Invalid Credentials");
                        }
                }
        }


  return (
  <>
  
  <Card >
        <Card.Body>
                <Form>
                        <Form.Group id = "email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id = "password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button className = "w-100" type = "button" onClick = {() => logInUser()}>Login</Button>
                        
                </Form>
        </Card.Body>
  </Card>
  <div className = "w-100 text-center mt-2"><a href = "/reset">Forgot password?</a></div>
  </>
  )
};

export default Login;
