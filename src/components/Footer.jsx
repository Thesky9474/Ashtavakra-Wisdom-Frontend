import React from "react";

export default function Footer() {
  return (
    <footer className="bg-cream/80 backdrop-blur-sm shadow-sm py-3 text-center text-sm text-gray-700">
      <p>📿 Built with devotion by Shivam Kumar Yadav • © {new Date().getFullYear()} Wisdom of Ashtavakra</p>
      <p className="text-xs mt-1">Inspired by teachings of Swami Chinmayananda • Jai Gurudev 🕉️</p>
    </footer>
  );
}
