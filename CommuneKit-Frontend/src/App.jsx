// App.jsx
import { useState } from 'react';
import './styles.css';
import Home from "./Home.jsx";
import Search from "./Search.jsx";
import Notifications from "./Notifications.jsx";
import Profile from "./Profile.jsx";
import MyItems from "./MyItems.jsx";
import ItemPage from "./ItemPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import FavoritePage from "./components/FavoritePage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReviewPage from "./ReviewPage.jsx";

export default function App() {
    return (
        <>
            <Router>
                <div>
                    <div className="menu-bar" id="navbar">
                        <Link id="logo" to="/home">
                            <img src="/CommuneKit Logo.png" alt="logo" />
                        </Link>
                        <Link to="/search" id="search-button"><button>Search</button></Link>
                        <Link to="/notifications" id="notif-button"><button>Notifications</button></Link>
                        <Link to="/profile" id="profile-button"><button>Profile</button></Link>
                        <Link to="/favorites" id="favorites-button"><button>Favorites</button></Link>
                        <OptionsMenu />
                    </div>
                    <Routes>
                        <Route path="/search" element={<Search />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/profile" element={<Profile isOwn={true} />} />
                        <Route path="/profile/my-items" element={<MyItems />} />
                        <Route path="/profile/my-items/dummypage" element={<ItemPage isOwn={true} />} />
                        <Route path="/item/:itemID" element={<ItemPage />} />
                        <Route path="/item/:itemID/create-review" element={<ReviewPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/favorites" element={<FavoritePage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Added reset password route */}
                        <Route path="/" element={<LoginPage />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

function OptionsMenu() {
    const [isClicked, setIsClicked] = useState(true);
    function handleClick() {
        setIsClicked(!isClicked);
    }
    return (
        <>
            {isClicked ? <button id="menu-button" onClick={handleClick}>Menu</button> :
                <div>
                    <MenuBar />
                    <button id="close-menu" onClick={handleClick}>X</button>
                    <div id="overlay"></div>
                </div>
            }
        </>
    );
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
                    <li><button id="sign-out" onClick={handleSignout}>Sign Out</button></li>
                </ul>
            </div>
        </>
    );
}
