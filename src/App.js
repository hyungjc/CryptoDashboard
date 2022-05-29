import React from 'react'
import {Container} from "react-bootstrap"
import Signup from "./frontend/components/Signup"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./frontend/components/Home"
import Dashboard from './frontend/components/Dashboard';
import {Button} from "react-bootstrap"
import {useState} from 'react'
import NotFound from './frontend/components/NotFound'
import Login from './frontend/components/Login'

function App()  {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}/>

        <Route path = "/login" element = {
          <Container className = "my-auto">
            <Login/>
          </Container>
        }/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>

        <Route path = "/signup" element = {
          
        <Container className="my-auto">
          <Signup/>
        </Container>
        }/>
        <Route path="*" element = {<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

//     return (

//             <>
//     <Container className = "d-flex align-items-center justify-content-center"
//        style = {{ minHeight: "100vh" }}>
//       <div>

//     <h1 className = "text-center mb-4" >Crypto Dashboard</h1>
//     <Button className = "w-100" type = "submit">Enter App</Button>
  
// </div>
//     </Container>
    
//     </>

//       }

      
     
      //   <Container 
      //       className = "d-flex align-items-center justify-content-center"
      //       style = {{ minHeight: "100vh" }}>
      //       <div className = "w-100" style = {{ maxWidth: "400px"}}>
      //         <Signup/>
      //       </div>
      //     </Container>
      // :<h2>Welcome</h2>
          
       

//   return (
//     <>
//     <Container className = "d-flex align-items-center justify-content-center"
//        style = {{ minHeight: "100vh" }}>
//       <div>

//     <h1 className = "text-center mb-4" >Crypto Dashboard</h1>
//     <Button className = "w-100" type = "submit">Enter App</Button>
  
// </div>
//     </Container>
    
//     </>
    
      
    

   
  
//   )


  // return (
  //   <Router>
  //     <div>
  //       <h2 className>Crypto Dashboard</h2>
  //       <nav>
  //         <ul>
  //           <li><Link to = {'/'}>Home</Link></li>
  //           <li><Link to = {'/signup'}>Signup</Link></li>
            
  //         </ul>
  //       </nav>
  //       <hr/>
  //       <Routes>
  //         <Route exact path = '/' component = {Home}/>
  //         <Route path = '/signup' element = {<Signup/>}/>
  //       </Routes>
  //     </div>
  //   </Router>
  // );



// {
//   return (
//     <Container 
//       className = "d-flex align-items-center justify-content-center"
//       style = {{ minHeight: "100vh" }}>
//       <div className = "w-100" style = {{ maxWidth: "400px"}}>
//         <Signup/>
//       </div>
//     </Container>
//   );
// }

export default App;
