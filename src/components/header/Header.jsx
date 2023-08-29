import React, { useEffect, useState } from 'react';
import "./style.scss";
import logo from "../../assets/movix-logo.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import ContentWrapper from './../contentWrapper/ContentWrapper';
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { SlMenu } from "react-icons/sl";



const Header = () => {



    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        console.log(window.scrollY);
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show")
            }
            setLastScrollY(window.scrollY);
        } else {
            setShow("top");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar)
        return () => {
            window.removeEventListener("scroll", controlNavbar)

        }
    }, [lastScrollY])



    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false)
            }, 1000)
        }
    }

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const navigationHandler = (type) => {
        if (type == "movie") {
            navigate("/explore/movie")
        } else {
            navigate("/explore/tv")
        }
        setMobileMenu(false);
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => {
                        navigationHandler("movie")
                    }}>Movies</li>
                    <li className="menuItem" onClick={() => {
                        navigationHandler("tv")
                    }}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ?
                        (<IoMdClose onClick={() => setMobileMenu(false)} />) :
                        (<SlMenu onClick={openMobileMenu} />)}
                </div>
                {showSearch && <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show..."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <IoMdClose
                                onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>}
            </ContentWrapper>
        </header>
    )
}

export default Header;