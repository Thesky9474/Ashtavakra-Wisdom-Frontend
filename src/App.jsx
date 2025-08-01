// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/ChatbotPage";
import About from "./pages/About";
import TagViewer from "./components/TagViewer";
import ChapterViewer from "./components/ChapterViewer"
import NewsletterSignup from "./components/NewsletterSignup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="tag/:tagName"
          element={
            <PrivateRoute>
              <TagViewer />
            </PrivateRoute>
          }
        />
        <Route
          path="/verses/chapter/:chapterNum"
          element={
            <PrivateRoute>
              <ChapterViewer />
            </PrivateRoute>
          }
        />
        <Route path="/newsletter" element={<NewsletterSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          }
        />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
