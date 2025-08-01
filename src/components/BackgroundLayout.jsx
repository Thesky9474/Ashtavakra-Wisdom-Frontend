import React from "react";

export default function BackgroundLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat"
         style={{ backgroundImage: "url('/ashtavakra-bg.jpg')" }}>
      
      {/* Overlay to darken for readability */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" />

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
