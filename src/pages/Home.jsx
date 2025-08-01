import VerseViewer from "../components/ChapterViewer";
import BackgroundLayout from "../components/BackgroundLayout";
import HomePage from "../components/HomePage";

const Home = () => {
  return (
    <BackgroundLayout>
    <div className="min-h-screen bg-yellow-50">
      <HomePage />
    </div>
    </BackgroundLayout>
  );
};

export default Home;
