// @ts-ignore
import { useState } from 'react'
import './styles.css'
import Home from "./Home.jsx"
import Search from "./Search.jsx"
import Notifications from "./Notifications.jsx"
import Profile from "./Profile.jsx"
import { BrowserRouter as Router, Route, Link, Routes,} from "react-router-dom";
import MyItems from "./MyItems.jsx";

export default function App() {
  return (
      <>
      <Router>
          <div>
              <div className="menu-bar" id="navbar">
                  <Link id="logo" to="/">
                      <img src="/CommuneKit Logo.png" alt="logo"></img>
                  </Link>
                  <Link to="/search" id="search-button"><button>Search</button></Link>
                  <Link to="/notifications" id="notif-button"><button>Notifications</button></Link>
                  <Link to="/profile" id="profile-button"><button>Profile</button></Link>
                  <MenuButton />
              </div>

              <Routes>
                  <Route path="/search" element={<Search />}/>
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile isOwn={true}/>} />
                  <Route path="/profile/my-items" element={<MyItems />} />
                  <Route path="/" element={<Home />}/>
              </Routes>
          </div>
          </Router>
      </>
  )
}

function MenuButton() {
    return (
        <>
            <button id="menu-button">Menu</button>
        </>
    )
}
