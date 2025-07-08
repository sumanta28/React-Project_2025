import React from "react";
import Navbar from "./components/Navbar";
import ProfileViewer from "./components/ProfileViewer";
import Footer from "./components/Footer";
import { Toaster } from "sonner"; 
const App = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <Toaster position="top-right" richColors /> 
      <Navbar />
      <div style={{ flex: 1 }}>
        <ProfileViewer />
      </div>
      <Footer />
    </div>
  );
};

export default App;
