// @ts-ignore
import {useEffect, useState} from 'react'
import './styles.css'
import Home from "./Home.jsx"
import Search from "./Search.jsx"
import Notifications from "./Notifications.jsx"
import Profile from "./Pages/Profile.jsx"
import { BrowserRouter as Router, Route, Link, Routes,} from "react-router-dom";
import MyItems from "./MyItems.jsx";
import ItemPage from "./Pages/ItemPage.jsx"
import LoginPage from "./components/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import FavoritePage from "./Pages/FavoritePage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import { useNavigate } from 'react-router-dom';
import ReviewPage from "./Pages/ReviewPage.jsx"
import NewItem from "./NewItem.jsx"
import AdminPage from "./components/AdminPage.jsx"
import ReportPage from "./Pages/ReportPage.jsx";
import LoadProfile from "./LoadProfile.jsx";
import BorrowHistoryPage from "./Pages/BorrowHistoryPage.jsx";
import OwnerPage from "./Pages/OwnerPage.jsx";

export default function App() {
    const [userID, setUserID] = useState( localStorage.getItem("userID") );
    // const navigate = useNavigate();
    useEffect(() => {
        setUserID(localStorage.getItem('userID'))
    }, [])
    //const userID = localStorage.getItem('userID')
    console.log("userID found to be: " + userID);

  return (
      <>
      <Router>
          <div>
              <div className="menu-bar" id="navbar">
                  <Link id="logo" to="/home">
                      <img src="/CommuneKit Logo.png" alt="logo" id="home-logo"></img>
                  </Link>
                  <div id="menu-buttons">
                    <Link to="/search"><button className="menu-button">Search</button></Link>
                    <Link to="/notifications"><button className="menu-button">Notifications</button></Link>
                    <Link to="/favorites"><button className="menu-button">Favorites</button></Link>
                    <Link to={"/profile/"}><button className="menu-button">Profile</button></Link>
                  <OptionsMenu />
                  </div>
              </div>
              <Routes>
                  <Route path="/search" element={<Search />}/>
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile/" element={<LoadProfile/>}/>
                  <Route path="/profile/:userID" element={<Profile/>} />
                  <Route path="/profile/:userID/my-items" element={<MyItems />} />
                  <Route path="/item/:itemID" element={<ItemPage />}/>
                  <Route path="/item/:itemID/create-review" element ={<ReviewPage />}/>
                  <Route path="/newitem" element={<NewItem />}/>
                  <Route path="/home" element={<Home />}/>
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/registration" element={<RegistrationPage />}/>
                  <Route path="/favorites" element={<FavoritePage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Added reset password route */}
                  <Route path="/admin" element={<AdminPage />}/>
                  <Route path="/owner" element={<OwnerPage />}/>
                  {/*// THIS IS THE CORRECT ORDERING of the admin directory*/}
                  <Route path="/report/:userID" element = {<ReportPage/>}/>
                  <Route path="/" element={<LoginPage />}/>
                  <Route path="/BorrowingHistory" element={<BorrowHistoryPage />} />

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
    const navigate = useNavigate();

    function handleSignout() {
        localStorage.clear();
        setIsClicked(true)
        navigate("/login");
    }

    function navigateToBorrowHistory() {
        setIsClicked(true);
        navigate("/BorrowingHistory");
    }
    return (
        <>
            {isClicked ? <button id="menu-button" onClick={handleClick} className="menu-button">Menu</button>
                 :
                <div>
                    <div id="menu-popup">
                        <ul>
                            <li>
                                <button id="sign-out" onClick={handleSignout}>Sign Out</button>
                            </li>
                            <li>
                                <button id="borrowing-history" onClick={navigateToBorrowHistory}>Borrowing History</button>
                            </li>
                        </ul>
                    </div>
                    <button id="close-menu" onClick={handleClick}>X</button>
                    <div id="overlay"></div>
                </div>
            }
        </>
    )
}

function MenuBar() {
    const navigate = useNavigate();

    function handleSignout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <>
            <div id="menu-popup">
                <ul>
                    <li>
                        <button id="sign-out" onClick={handleSignout}>Sign Out</button>
                    </li>
                    {/*<li><button>Delete Account</button></li>*/}
                    <li>
                        <button id="borrowing-history" onClick={navigateToBorrowHistory}></button>
                    </li>
                </ul>
            </div>
        </>
    );
}
