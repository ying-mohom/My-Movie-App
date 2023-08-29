
import { useState, useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';



import Header from "./components/header/Header";
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import pageNotFound from './pages/404/pageNotFound';



const App = () => {
    const dispatch = useDispatch();

    const url = useSelector((store) =>
        store.home);
    console.log("Data from store:", url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, [])

    const fetchApiConfig = () => {
        fetchDataFromApi('/configuration')
            .then((res) => {
                console.log("Configuration response:", res); //Get List of data

                const url = {
                    backdrop: res.images.secure_base_url +
                        "original",
                    poster: res.images.secure_base_url +
                        "original",
                    profile: res.images.secure_base_url +
                        "original",
                }
                dispatch(getApiConfiguration(url))
            })
    };

    const genresCall = async () => {
        let promises = []
        let endPoints = ["tv", "movie"]
        let allGenres = {}

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] =
                item))
        })

        // console.log(allGenres);
        dispatch(getGenres(allGenres));
    }


    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<pageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
