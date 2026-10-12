import React from 'react'
import './Home.css'
import {Nav , Footer} from '../../Components'

function Home() {
  return (
    <div>
      <h2>Home page</h2>
      <Nav />
      
      
      <Outlet /> 
      <Footer />
    </div>
  )
}

export default Home
