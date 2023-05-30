import React from 'react'
import { Link, NavLink } from 'react-router-dom';



export default function Navbar({ userData, logOut }) {


  return (<>
    <nav class="navbar navbar-expand-lg bg-body-tertiary text-black fixed-top">
      <div class="container">
        <NavLink className="navbar-brand " to="/">
          Notes
        </NavLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item ">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">
                <i class="fa-solid fa-house"></i>
              </NavLink>
            </li>
          </ul> : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {userData === null ? <>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  to="register">Register
                </NavLink>
              </li></> :
              <>
                <li className="nav-item ">
                  <Link onClick={logOut} className="cursor-pointer nav-link">Logout</Link>
                </li>
              </>}


          </ul>



        </div>
      </div>
    </nav>



  </>)
}
