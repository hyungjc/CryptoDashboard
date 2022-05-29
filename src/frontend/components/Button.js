import React from 'react';

const Button = ({text, color, path}) => {

        const onClick = () => {
                console.log("Click", {name})
                change(!state)

        }
  return (

        <button onClick ={onClick} style = {{backgroundColor: color}}>{text}</button>
  )
 
}
export default Button;
