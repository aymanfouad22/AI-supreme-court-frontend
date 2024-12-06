// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";  
import logo from './logo.png';
import LoginPage from "./LoginPage";  
import HomePage from "./HomePage"; 

const App = () => {
  const [selectedYear, setSelectedYear] = useState(2024); 
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  // Check if the user is logged in
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const fetchCases = async (year) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://scotusapi.doesntexist.com/getCases?year=${year}`);
      console.log("Fetched Cases:", response.data);
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases(selectedYear);
  }, [selectedYear]);

  const handleCaseSelect = (courtCase) => {
    setSelectedCase(courtCase);
    setIsChatbotVisible(true);
    setChatbotMessages([{ sender: "rag", message: `You can ask about ${courtCase}.` }]); 
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [
        ...chatbotMessages,
        { sender: "user", message: userInput }
      ];
  
      setChatbotMessages(newMessages);
      setUserInput("");
  
      const encodedUserName = encodeURIComponent(userName);
      const encodedYear = encodeURIComponent(selectedYear);
      const encodedCaseName = encodeURIComponent(selectedCase);
      const encodedUserMessage = encodeURIComponent(userInput);
  
      axios
        .get(
          `http://scotusapi.doesntexist.com/chat?userName=${encodedUserName}&year=${encodedYear}&caseName=${encodedCaseName}&userMessage=${encodedUserMessage}`
        )
        .then((response) => {
          if (response.status === 200) {
            setChatbotMessages([
              ...newMessages,
              { sender: "rag", message: response.data.answer || "Sorry, no response from chatbot." }
            ]);
          } else {
            setChatbotMessages([
              ...newMessages,
              { sender: "rag", message: `Error: Status ${response.status}.` }
            ]);
          }
        })
        .catch((error) => {
          console.error("Error sending message to chatbot:", error);
          setChatbotMessages([
            ...newMessages,
            { sender: "rag", message: "Sorry, I couldn't process your request at the moment." }
          ]);
        });
    }
  };

  // Render the main content only if the user is logged in
  if (!userName) {
    return <LoginPage setUserName={setUserName} />;
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="court-name">AI Supreme Court</h1>
        {userName && <p className="greeting">Welcome, {userName}!</p>}
      </header>

      {/* Year Selection Panel */}
      <div className="year-panel">
        <div className="years">
          {[2024, 2023, 2022].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={selectedYear === year ? "selected" : ""}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="case-list-container">
          <h2>Cases from {selectedYear}</h2>
          {loading ? (
            <p>Loading cases...</p>
          ) : cases.length === 0 ? (
            <p>No cases available for this year.</p>
          ) : (
            <ul className="case-list">
              {cases.map((courtCase) => (
                <li
                  key={courtCase.id}
                  onClick={() => handleCaseSelect(courtCase)}
                  className={`case-item ${selectedCase === courtCase ? "active" : ""}`}
                >
                  <div className="case-name">{courtCase}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isChatbotVisible && selectedCase && (
          <div className="chatbot-container">
            <h3>Chatbot: Ask about {selectedCase}</h3>
            <div className="chatbot">
              <div className="messages">
                {chatbotMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender === "user" ? "user" : "rag"}`}
                  >
                    {msg.message}
                  </div>
                ))}
              </div>

              <div className="input-panel">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
