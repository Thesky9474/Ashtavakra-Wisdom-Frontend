import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackgroundLayout from "../components/BackgroundLayout";
import wisdomApi from "../utils/wisdom";

const ChapterViewer = () => {
  const { chapterNum } = useParams();
  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);
  const [chaptersLoading, setChaptersLoading] = useState(true);
  
  const [verses, setVerses] = useState([]);
  const [versesLoading, setVersesLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✨ NEW: State to store the current chapter's title
  const [chapterTitle, setChapterTitle] = useState("");

  // Effect to fetch the list of all chapters for the navigation bar
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await wisdomApi.get("/verses/chapters");
        setChapters(response.data);
      } catch (e) {
        console.error("Failed to load chapter list:", e);
      } finally {
        setChaptersLoading(false);
      }
    };
    fetchChapters();
  }, []);

  // Effect to fetch verses for the current chapter
  useEffect(() => {
    if (!chapterNum) return;
    const fetchVersesForChapter = async () => {
      setVersesLoading(true);
      setError(null);
      setChapterTitle(""); 
      try {
        const response = await wisdomApi.get(`/verses/chapter/${chapterNum}`);
        setVerses(response.data);
        
        if (response.data && response.data.length > 0) {
          setChapterTitle(response.data[0].chapter_title);
        }
      } catch (e) {
        setError(e.message || "Failed to load chapter content.");
        console.error(e);
        setVerses([]);
      } finally {
        setVersesLoading(false);
      }
    };
    fetchVersesForChapter();
  }, [chapterNum]);

  return (
    <BackgroundLayout>
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-lora font-bold text-charcoal">
            Chapter {chapterNum}
          </h1>
          {chapterTitle && <p className="text-xl text-charcoal/70 mt-2">{chapterTitle}</p>}
        </div>

        {/* --- Chapter navigation buttons --- */}
        <div className="sticky top-[70px] bg-cream/80 backdrop-blur-sm py-4 z-10 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
                {chaptersLoading ? (
                <p className="text-sm text-charcoal/60">Loading chapters...</p>
                ) : (
                chapters.map(ch => (
                    <button
                    key={ch}
                    disabled={versesLoading}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 ${
                        parseInt(chapterNum) === ch
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white/50 text-charcoal border-charcoal/20 hover:bg-cream hover:border-charcoal disabled:opacity-50"
                    }`}
                    onClick={() => navigate(`/verses/chapter/${ch}`)}
                    >
                    {ch}
                    </button>
                ))
                )}
            </div>
        </div>

        {/* --- Verses Display --- */}
        <div className="space-y-8">
          {versesLoading ? (
            <div className="text-center text-charcoal/80">Loading Wisdom...</div>
          ) : error ? (
            <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>
          ) : (
            verses.map((verse, index) => (
              <div
                key={verse._id}
                className="bg-cream/50 p-6 rounded-lg border border-yellow-800/10 fade-in-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="text-charcoal font-semibold font-lora">Verse {verse.verse_number}</p>
                <p className="text-sm mt-2 text-charcoal/60 italic">{verse.transliteration}</p>
                <p className="mt-4 text-xl font-lora text-charcoal">{verse.sanskrit}</p>
                <p className="mt-2 text-base text-sage">{verse.english}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-saffron font-medium">Commentary</summary>
                  <p className="mt-2 text-sm text-charcoal/80 whitespace-pre-line leading-relaxed">{verse.commentary}</p>
                </details>
              </div>
            ))
          )}
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default ChapterViewer;