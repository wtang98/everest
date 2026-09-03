import { useState, useEffect } from "react";
import { Header } from "./components/header/header";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/about/about.jsx";
import Services from "./pages/services/services.jsx";
import Home from "./pages/home/home.jsx";
import Contact from "./pages/contact/contact.jsx";
import Securities from "./pages/securities/securities.jsx";

import "./App.scss";
import Footer from "./components/footer/footer.jsx";

const App = () => {
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("user_profile");
        return savedLanguage ? JSON.parse(savedLanguage) : "Eng";
    });

    useEffect(() => {
        localStorage.setItem("user_profile", JSON.stringify(currentLanguage));
    }, [currentLanguage]);

    return (
        <div className="App">
            <BrowserRouter>
                <div className="App__header">
                    <Header
                        currentLanguage={currentLanguage}
                        setCurrentLanguage={setCurrentLanguage}
                    />
                </div>
                <div className="App__content">
                    <Routes>
                        <Route
                            path="/about"
                            element={
                                <About currentLanguage={currentLanguage} />
                            }
                        />
                        <Route
                            path="/securities"
                            element={
                                <Securities currentLanguage={currentLanguage} />
                            }
                        />
                        <Route
                            path="/services"
                            element={
                                <Services currentLanguage={currentLanguage} />
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                <Contact currentLanguage={currentLanguage} />
                            }
                        />
                        <Route
                            path="/everest"
                            element={<Home currentLanguage={currentLanguage} />}
                        />
                        <Route
                            path="/"
                            element={<Home currentLanguage={currentLanguage} />}
                        />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
