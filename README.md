# AI Supreme Court

## Overview

### Problem Statement:
**AI Supreme Court** is an interactive application designed to help users engage in conversations with an AI chatbot about specific U.S. Supreme Court cases. The app filters cases by year and allows the user to query detailed information about each case. The purpose of this project is to make legal case information more accessible, understandable, and interactive for anyone interested in U.S. Supreme Court decisions.

### Target Audience:
- **Legal professionals** (lawyers, researchers, students) who need an efficient way to explore case law.
- **Legal tech developers** looking to integrate AI with court data for legal research purposes.
- **General users** who are interested in U.S. Supreme Court cases and want to interact with a chatbot for educational or personal purposes.

### Future Plans:
After the class ends, the project will continue evolving with these goals:
- **Expansion of Case Data:** Integrate more years and case types.
- **Improve AI Accuracy:** Use more advanced AI models to provide better responses for user queries.
- **Global Deployment:** Deploy the app on a cloud platform (e.g., AWS, Firebase) for global accessibility.
- **Collaboration:** Open-source contributions from legal experts and AI developers.

## Backend

### Tech Stack:
- **Spring Boot:** The backend is built with the Spring Boot framework. It handles data processing, AI chat model creation, and API services.
- **Java:** Used for building the backend logic, including case data filtering by year and case name.
- **Embeddings:** The backend employs an embeddings-based chat model for each case document, allowing users to ask specific questions and get relevant answers.

### Backend Features:
- **Case Filtering by Year:** Users can filter Supreme Court cases by year.
- **Case Querying:** Users can select a specific case and interact with the chatbot to ask questions about that case.
- **Embeddings Script:** Each case document is embedded to provide meaningful and relevant responses using an AI model.
- **API Routes:** The backend exposes APIs that the frontend (React app) calls for case data and chatbot responses.

### Backend Setup:
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/ai-supreme-court-backend.git
    cd ai-supreme-court-backend
    ```
2. **Install Dependencies:**
    ```bash
    mvn clean install
    ```
3. **Run the Spring Boot Application:**
    ```bash
    mvn spring-boot:run
    ```
4. **API Endpoints:**
    - **Get Cases by Year:** `GET /cases?year={year}`
    - **Get Chatbot Response:** `GET /chat?userName={userName}&year={year}&caseName={caseName}&userMessage={message}`

## Database Schema

### Tables:

#### 1. Cases:
- **id:** Unique identifier for each case.
- **case_name:** Name of the case.
- **year:** Year the case was decided.
- **summary:** Short description of the case.

#### 2. Chatbot Interactions:
- **id:** Unique interaction identifier.
- **user_id:** ID of the user who interacted with the chatbot.
- **case_id:** ID of the case being queried.
- **message:** User's input message.
- **response:** AI's response.

## AI Description

### How Gen-AI Is Used:
The AI component of this application uses **Generative AI** (GPT) to simulate human-like interactions with the chatbot. Here's how the AI processes user inputs:

1. **User Query:** The user asks a question about a selected case.
2. **Text Embeddings:** The backend generates embeddings for each case document. These embeddings represent the textual content of the case in a numerical format.
3. **Chatbot Response:** The AI uses these embeddings to retrieve relevant information and generate a meaningful response.
4. **Real-time Interaction:** As the user continues to interact with the chatbot, the system provides more refined answers based on the case-specific data.

This setup allows users to have a natural conversation with the AI while getting detailed responses about court cases.

## Frontend (React)

### Tech Stack:
- **React:** Frontend framework to build the user interface.
- **Axios:** Used to make HTTP requests to the backend APIs.
- **Firebase:** Used for user authentication.

### Setup and Run Locally:
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/ai-supreme-court-frontend.git
    cd ai-supreme-court-frontend
    ```
2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Run the Application:**
    ```bash
    npm start
    ```
4. **Firebase Setup (for Authentication):**
    - Create a Firebase project.
    - Set up authentication and Firestore.
    - Update the `firebase-config.js` file with your Firebase credentials.

5. **Interact with the App:**
    - Log in using Google Authentication.
    - Select a year and a specific case.
    - Start chatting with the AI chatbot to ask questions about the case.

## Video Demonstrations

### 1. App in Action:
Watch a video demonstrating how users interact with the app, query cases, and use the chatbot.  
[Watch the App Demo Video]([link-to-video](https://go.screenpal.com/watch/cZl1YunnYj2?_gl=1*11yon26*_ga*ODkwMzUwODA2LjE3MzM1MTY0ODA.*_ga_J7G603GGVL*MTczMzUxNjQ4MC4xLjEuMTczMzUxNzA3MC4wLjAuMA..))


