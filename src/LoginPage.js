import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase-config"; // Firebase configuration
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./LoginPage.css"; 

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  // Check if the user is logged in on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Store the user's display name in localStorage
        localStorage.setItem('userName', user.displayName);
        // Navigate to the home page after successful login
        navigate("/home");
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);
  // Sign-in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);

      // Store the user's display name in localStorage
      localStorage.setItem('userName', user.displayName);

      // Navigate to the home page after successful login
      navigate("/home");  // Ensure the correct redirect to home page
    } catch (error) {
      setError(error.message);
      console.error("Error during sign-in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login Page</h2>

        {loading && <div className="loading-spinner">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        <button onClick={signInWithGoogle} className="login-btn">
          Sign In with Google
        </button>

        <p className="login-info">Sign in to continue to the AI Supreme Court</p>
      </div>
    </div>
  );
}

export default LoginPage;
