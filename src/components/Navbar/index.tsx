import React from 'react'
import {
    Link
  } from "react-router-dom";
  

function Navbar() {
  return (
    <nav>
       <div className='left'>
        <div>
            <Link to="/">Ürünler</Link>
        </div>
        </div>
        <div className='right'>
        <div>
            <Link to="/cartcontent">Sepet</Link>
        </div>
        </div>
      </nav>
  )
}

export default Navbar