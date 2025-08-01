import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import wisdomApi from "../utils/wisdom";
import BackgroundLayout from "../components/BackgroundLayout";
import { ArrowRight } from "lucide-react";

// ✨ UPDATED: A more engaging and informative preview card
const VersePreviewCard = ({ verse }) => (
  <div className="bg-cream/50 p-6 rounded-lg border border-yellow-800/10 h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:border-saffron">
    <p className="font-lora text-charcoal font-semibold">Verse {verse.verse_number || `${verse.chapter}.${verse.verse}`}</p>
    <p className="text-sage mt-2 text-sm md:text-base flex-grow">
      "{verse.sanskrit}"
    </p>
  </div>
);

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [featuredTags, setFeaturedTags] = useState({});
  const [featuredChapter, setFeaturedChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const tagsToFeature = ['knowledge', 'liberation', 'renunciation'];
        const chapterToFeature = 1;

        const tagPromises = tagsToFeature.map(tag =>
          wisdomApi.get(`/tags/tags/${tag}?limit=3`)
        );
        const tagResults = await Promise.all(tagPromises);

        const tagsData = {};
        tagsToFeature.forEach((tag, index) => {
          tagsData[tag] = tagResults[index].data;
        });
        setFeaturedTags(tagsData);

        const chapterRes = await wisdomApi.get(`/verses/chapter/${chapterToFeature}?limit=5`);
        if (chapterRes.data && chapterRes.data.length > 0) {
            setFeaturedChapter({ 
                number: chapterToFeature, 
                verses: chapterRes.data,
                title: chapterRes.data[0].chapter_title // Get title from the first verse
            });
        }

      } catch (error) {
        console.error("Failed to load homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);


  return (
    <BackgroundLayout>
      <div className="py-12 px-4 fade-in-card">
        {/* ✨ UPDATED: Hero Section with a stronger presence */}
        <div className="text-center max-w-3xl mx-auto py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-lora font-bold text-charcoal leading-tight">The Path to Self-Realization</h1>
          <p className="mt-4 text-lg text-charcoal/80 leading-relaxed">
            Explore the timeless wisdom of the Ashtavakra Gita. A direct dialogue on non-duality, freedom, and the nature of reality.
          </p>
          {!user && (
            <Link to="/register" className="mt-8 inline-block bg-saffron text-white py-3 px-8 rounded-lg font-semibold hover:bg-saffron/90 transition-transform hover:scale-105">
              Begin Your Journey
            </Link>
          )}
        </div>

        {/* --- Discover by Theme Section --- */}
        <div className="max-w-6xl mx-auto mt-6">
          <h2 className="text-3xl font-lora text-center text-charcoal mb-12">Discover by Theme</h2>
          {loading ? <p className="text-center">Loading themes...</p> : (
            <div className="space-y-16">
              {Object.entries(featuredTags).map(([tag, verses]) => (
                <div key={tag}>
                  {/* ✨ UPDATED: Section header with link */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-lora text-charcoal capitalize">{tag}</h3>
                    <Link to={user ? `/tag/${tag}` : '/login'} className="text-saffron font-medium hover:underline flex items-center gap-2">
                      View all <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {verses.map(verse => <VersePreviewCard key={verse._id} verse={verse} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* --- Divider --- */}
        <hr className="my-10 border-t border-yellow-800/10 max-w-3xl mx-auto" />

        {/* --- Explore Chapters Section --- */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-lora text-center text-charcoal mb-12">Explore the Chapters</h2>
          {loading ? <p className="text-center">Loading chapters...</p> : featuredChapter && (
             <div>
                <div className="flex justify-between items-center mb-6">
                   <div>
                    <h3 className="text-2xl font-lora text-charcoal">Chapter {featuredChapter.number}</h3>
                    <p className="text-charcoal/70">{featuredChapter.title}</p>
                  </div>
                   <Link to={user ? `verses/chapter/${featuredChapter.number}` : '/login'} className="text-saffron font-medium hover:underline flex items-center gap-2">
                    Read full chapter <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {featuredChapter.verses.map(verse => <VersePreviewCard key={verse._id} verse={verse} />)}
                </div>
              </div>
          )}
        </div>

      </div>
    </BackgroundLayout>
  );
}