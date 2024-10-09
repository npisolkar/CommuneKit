// @ts-ignore
import { useState } from 'react'
import './styles.css'
import Home from "./Home.jsx"
import Search from "./Search.jsx"
import Notifications from "./Notifications.jsx"
import Profile from "./Profile.jsx"
import { BrowserRouter as Router, Route, Link, Routes,} from "react-router-dom";
import MyItems from "./MyItems.jsx";
import ItemPage from "./ItemPage.jsx"

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
                  <OptionsMenu />
              </div>

              <Routes>
                  <Route path="/search" element={<Search />}/>
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile isOwn={true} userID={'1'}/>} />
                  <Route path="/profile/my-items" element={<MyItems />} />
                  <Route path="/profile/my-items/dummypage" element={<ItemPage isOwn={true}/>}/>
                  <Route path="/" element={<Home />}/>
              </Routes>
          </div>
          </Router>
      </>
  )
}

/* These two functions are what allow the menu bar, which is hidden
*  until the menu bar is clicked, to exist. */
function OptionsMenu() {
    const [isClicked, setIsClicked] = useState(true);
    function handleClick() {
        setIsClicked(!isClicked);
    }
    return (
        <>
            {isClicked ? <button id="menu-button" onClick={handleClick}>Menu</button>
                 :
                <div>
                    <MenuBar />
                    <button id="close-menu" onClick={handleClick}>X</button>
                    <div id="overlay"></div>
                </div>
            }
        </>
    )
}

function MenuBar() {
    return (
        <>
            <div id="menu-popup">
                <ul>
                    <li><button>Sign Out</button></li>
                    <li><button>Delete Account</button></li>
                </ul>
            </div>
        </>
    )
}