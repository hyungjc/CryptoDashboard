import {Form, Button, Card} from 'react-bootstrap'
import {useState} from 'react'
import httpClient from "../../httpClient"

const Signup = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [repassword, setPasswordConfirm] = useState("")
        const [pvtKey, setApiPrivate] = useState("")
        const [pubKey, setApiPublic] = useState("")
        const [walletAddress, setWalletAddress] = useState("")
        

        // const emailRef = useRef()
        // const passwordRef = useRef()
        // const passwordConfirmRef = useRef()
        // const apiPublicRef = useRef()
        // const apiPrivateRef = useRef()
        // const walletAddressRef = useRef()

        const signInUser = async () => {
                console.log(email)

                if (password !== repassword){
                        alert("Passwords do not match. Try again")
                }
                else{
                        const resp = await httpClient.post("//localhost:5000/signup", {
                        email,
                        password,
                        repassword,
                        pvtKey,
                        pubKey,
                        walletAddress,
                });

                console.log(resp.data);
                }
                

        }

        


  return (
  <>
  <Card >
        <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form>
                        <Form.Group id = "email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id = "password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type = "password" value = {repassword} onChange = {(e) => setPasswordConfirm(e.target.value)}required />
                        </Form.Group>
                        <Form.Group id = "api-public">
                                <Form.Label>API Private</Form.Label>
                                <Form.Control type = "string" value = {pvtKey} onChange = {(e) => setApiPrivate(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id = "api-private">
                                <Form.Label>API Public</Form.Label>
                                <Form.Control type = "string" value = {pubKey} onChange = {(e) => setApiPublic(e.target.value)} required />
                        </Form.Group>
                        <Form.Group id = "wallet-address">
                                <Form.Label>Wallet Address</Form.Label>
                                <Form.Control type = "string" value = {walletAddress} onChange = {(e) => setWalletAddress(e.target.value)} required />
                        </Form.Group>
                        <Button className = "w-100" type = "button" onClick = {() => signInUser()}>Sign Up</Button>
                </Form>
        </Card.Body>
  </Card>
  <div className = "w-100 text-center mt-2">Already have an account? <a href = "/login">Log In</a></div>
  </>
  )
};

export default Signup;
