import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "./components/Services";
import Download from "../components/Download";
import Reviews from "../components/Reviews";
import TopReasons from "../components/TopReasons";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ChatbotIcon from "../components/Chatbot";
import ChatbotModal from "../components/Modals/Chatbot";

function App() {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const handleChatbotOpen = () => {
    setChatbotOpen(true);
  };

  const handleChatbotClose = () => {
    setChatbotOpen(false);
  };

  return (
    <div>
      {/* <Navbar openLoginSignupModal={openLoginSignupModal} /> */}

      {/* <Hero /> */}
      <Services />
      <TopReasons />
      <Reviews />
      <Banner />
      <Download />
      <ChatbotIcon onClick={handleChatbotOpen} />

      {isChatbotOpen && <ChatbotModal onClose={handleChatbotClose} />}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
