import React from 'react'
import './error.css'
import {Link} from 'react-router-dom'
import { Button } from '@mui/material'
function ErrorPage() {
  return (
      <div className='container errorpage' >
        <div>
        <h1>Not Found!</h1>
        <h1> OOPS! You are Lost.</h1>
        <p>The Page you are looking for dose not exit here.
        <br/>
        But you can click the below button to go back to the Homepage </p>
        <Link to="/login"> 
        <Button variant='contained' color="error" > Go Back</Button>
        </Link>
        </div>
      </div>
  )
}

export default ErrorPage
//http://20.231.8.8:7077/api