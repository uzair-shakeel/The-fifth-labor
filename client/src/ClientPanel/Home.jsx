import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "./components/Services";
import Download from "../components/Download";
import Reviews from "../components/Reviews";
import TopReasons from "../components/TopReasons";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ChatbotIcon from "../components/Chatbot";
import WhatsappIcon from "../components/WhatsappIcon";
import ChatbotModal from "../components/Modals/Chatbot";
import { AuthContext } from "../context/auth-context";
import Search from "../components/Search";
import BlogList from "../components/Blogs";
function App() {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const handleChatbotOpen = () => {
    setChatbotOpen(true);
  };

  const handleChatbotClose = () => {
    setChatbotOpen(false);
  };

  return (
    <div>
      {/* {isLoggedIn ? <Services /> : <Hero />} */}
      {/* <Search /> */}
      <Hero />
      <Services />
      <TopReasons />
      <Reviews />
      <BlogList />
      <Banner />
      <Download />
      <ChatbotIcon onClick={handleChatbotOpen} />
      <WhatsappIcon />
      {isChatbotOpen && <ChatbotModal onClose={handleChatbotClose} />}
    </div>
  );
}

export default App;
