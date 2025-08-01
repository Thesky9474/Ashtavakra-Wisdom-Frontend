import ChatBot from "../components/ChatBot";
import BackgroundLayout from "../components/BackgroundLayout";

const ChatbotPage = () => {
  return (
    <BackgroundLayout>
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-yellow-700">
        🧘 Ashtavakra Wisdom Chat
      </h1>
      <ChatBot />
    </div>
    </BackgroundLayout>
  );
};

export default ChatbotPage;
