import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from './logo.png';

// Main App Component
const App = () => {
  const [selectedYear, setSelectedYear] = useState(2024); // Default selected year
  const [cases, setCases] = useState([]); // State to hold the cases
  const [selectedCase, setSelectedCase] = useState(null); // State to hold the selected case
  const [chatbotMessages, setChatbotMessages] = useState([]); // State for chatbot messages
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // State to toggle chatbot visibility
  const [userInput, setUserInput] = useState(""); // State for the user input
  const [loading, setLoading] = useState(false); // Loading state for the API request
  const [userName, setUserName] = useState("ayman"); // State for username

  // Fetch cases from the Spring API based on the selected year
  const fetchCases = async (year) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://scotusapi.doesntexist.com/getCases?year=${year}`);
      console.log("Fetched Cases:", response.data); // Log fetched cases for debugging
      setCases(response.data); // Assuming response.data is an array of cases
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cases whenever the selected year changes
  useEffect(() => {
    fetchCases(selectedYear);
  }, [selectedYear]);

  // Handle case selection to show the chatbot
  const handleCaseSelect = (courtCase) => {
    setSelectedCase(courtCase);
    setIsChatbotVisible(true);
    setChatbotMessages([{ sender: "rag", message: `You can ask about ${courtCase}.` }]); // Initial message
  };

  // Handle sending a message to the RAG-based chatbot using .then() and .catch()
  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [
        ...chatbotMessages,
        { sender: "user", message: userInput }
      ];
  
      setChatbotMessages(newMessages);
      setUserInput(""); // Clear input field
  
      // URL encode all parameters
      const encodedUserName = encodeURIComponent(userName);
      const encodedYear = encodeURIComponent(selectedYear);
      const encodedCaseName = encodeURIComponent(selectedCase);
      const encodedUserMessage = encodeURIComponent(userInput);
  
      console.log(encodedCaseName);
  
      // Log request data for debugging
      console.log("Sending request with parameters:", {
        userName: encodedUserName,
        year: encodedYear,
        caseName: encodedCaseName,
        userMessage: encodedUserMessage,
      });
  
      // Make the request to the API using axios with .then() and .catch()
      axios
        .get(
          `http://scotusapi.doesntexist.com/chat?userName=${encodedUserName}&year=${encodedYear}&caseName=${encodedCaseName}&userMessage=${encodedUserMessage}`
        )
        .then((response) => {
          // Log the full response to see what we get
          console.log("Chatbot Response:", response);
  
          if (response.status === 200) {
            // Check if the response is JSON or plain text
            if (response.data && typeof response.data === 'object' && response.data.answer) {
              // If it's JSON with an "answer" field
              setChatbotMessages([
                ...newMessages,
                { sender: "rag", message: response.data.answer }
              ]);
            } else if (typeof response.data === 'string') {
              // If it's plain text, treat it as a string and display
              setChatbotMessages([
                ...newMessages,
                { sender: "rag", message: response.data }
              ]);
            } else {
              // If the format is not as expected
              setChatbotMessages([
                ...newMessages,
                { sender: "rag", message: "Sorry, I couldn't retrieve a valid response." }
              ]);
            }
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
  document.addEventListener('DOMContentLoaded', () => {
    const caseItems = document.querySelectorAll('.case-item');
  
    caseItems.forEach((item) => {
      item.addEventListener('click', () => {
        // Remove the active class from all items
        caseItems.forEach((caseItem) => caseItem.classList.remove('active'));
        
        // Add the active class to the clicked item
        item.classList.add('active');
      });
    });
  });
  
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="court-name">AI Supreme Court</h1>
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
          key={courtCase.id} // Use a unique key
          onClick={() => handleCaseSelect(courtCase)}
          className={`case-item ${selectedCase === courtCase ? "active" : ""}`}
        >
          <div className="case-name">{courtCase}</div>
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Chatbot Section */}
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
