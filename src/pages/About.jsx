import React from "react";
import BackgroundLayout from "../components/BackgroundLayout";

export default function About() {
  return (
    <BackgroundLayout>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-charcoal font-lora mb-6 text-center">
          🕉️ About Wisdom of Ashtavakra
        </h1>
        <div className="bg-cream/50 p-8 rounded-lg border border-yellow-800/10 space-y-4 text-charcoal/90 leading-relaxed">
          <p>
            <strong>Wisdom of Ashtavakra</strong> is a spiritual web application
            designed for sincere seekers to deeply engage with the timeless teachings
            of the <strong>Ashtavakra Gita</strong> — a jewel of Advaita Vedanta that
            reveals the non-dual Self beyond mind and matter.
          </p>

          <p>
            This project is inspired by the commentary of <strong>Swami Chinmayananda</strong>,
            and offers the original Sanskrit verses, their transliteration, English
            translations, and detailed Vedantic commentary — all woven into a single
            contemplative space.
          </p>

          <p>
            Whether you're here to understand, reflect, or rest in your true nature,
            this app is your companion on the path of inner awakening. It offers:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>📖 Verse-by-verse browser with translations and commentary</li>
            <li>🤖 Gemini-powered chatbot using RAG trained for Advaita-based spiritual dialogue</li>
            <li>📬 Weekly reflections via email to inspire regular insight</li>
            <li>🔐 Create an account to save your chats and personalize your learning journey.</li>
            <li>💬 Persistent chat history to revisit your past conversations</li>
          </ul>

          <p className="text-center pt-4 font-lora">
            May this app help you not just study the words of Ashtavakra,
            but realize the silence behind them. 🙏
          </p>
        </div>
      </div>
    </BackgroundLayout>
  );
}
