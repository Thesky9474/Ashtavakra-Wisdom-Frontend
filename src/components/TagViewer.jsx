import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import wisdomApi from "../utils/wisdom";
import BackgroundLayout from "../components/BackgroundLayout";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for the button

const TagViewer = () => {
  const { tagName } = useParams();
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  
  // ✨ NEW: State to manage the expanded view of tags
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const [verses, setVerses] = useState([]);
  const [versesLoading, setVersesLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Effects for fetching data (no changes here) ---
  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await wisdomApi.get("/tags/");
        setTags(response.data.map(tag => tag.name));
      } catch (e) {
        console.error("Failed to load tag list:", e);
      } finally {
        setTagsLoading(false);
      }
    };
    fetchAllTags();
  }, []);

  useEffect(() => {
    if (!tagName) return;
    const fetchVersesForTag = async () => {
      setVersesLoading(true);
      setError(null);
      try {
        const response = await wisdomApi.get(`/tags/tags/${tagName}`);
        setVerses(response.data);
      } catch (err) {
        console.error(`Error fetching verses for tag "${tagName}":`, err);
        setError(`Could not load verses for the theme "${tagName}".`);
      } finally {
        setVersesLoading(false);
      }
    };
    fetchVersesForTag();
  }, [tagName]);

  const formattedTagName = tagName ? tagName.charAt(0).toUpperCase() + tagName.slice(1) : "";

  // ✨ NEW: Logic to determine which tags to display
  const displayedTags = isTagsExpanded ? tags : tags.slice(0, 15); // Show first 15 tags initially

  return (
    <BackgroundLayout>
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-lora font-bold text-charcoal">
            Verses on {formattedTagName}
          </h1>
        </div>

        {/* --- UPDATED: Tag navigation section --- */}
        <div className="sticky top-[70px] bg-cream/80 backdrop-blur-sm py-4 z-10 mb-8">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {tagsLoading ? (
              <p className="text-sm text-charcoal/60">Loading themes...</p>
            ) : (
              <>
                {displayedTags.map(tag => (
                  <button
                    key={tag}
                    disabled={versesLoading}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                      tagName === tag
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white/50 text-charcoal border-charcoal/20 hover:bg-cream hover:border-charcoal disabled:opacity-50"
                    }`}
                    onClick={() => navigate(`/tag/${tag}`)}
                  >
                    {tag}
                  </button>
                ))}
                {/* ✨ NEW: "Show More" / "Show Less" Button */}
                {tags.length > 15 && (
                  <button
                    onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                    className="flex items-center gap-1 text-sm font-semibold text-saffron hover:underline"
                  >
                    {isTagsExpanded ? "Show Less" : "More"}
                    {isTagsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* --- Verses Display (no changes here) --- */}
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
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <p className="text-charcoal font-semibold font-lora">Verse {verse.verse_number}</p>
                <p className="text-sm mt-2 text-charcoal/60 italic">{verse.transliteration}</p>
                <p className="mt-4 text-xl font-lora text-charcoal">{verse.sanskrit}</p>
                <p className="mt-2 text-base text-sage">{verse.english}</p>
                <details className="mt-4">
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

export default TagViewer;