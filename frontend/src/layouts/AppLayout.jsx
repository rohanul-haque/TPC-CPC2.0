import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const AppLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 w-10 h-10 bg-indigo-500 shadow-lg rounded-md flex items-center justify-center hover:bg-indigo-600"
          aria-label="Scroll to top"
        >
          <ChevronUp className="text-white" />
        </button>
      )}

      <div className="min-h-screen w-full bg-white dark:bg-[#020617] relative">
        <div
          className="absolute inset-0 z-0 bg-fixed 
            bg-[linear-gradient(to_right,rgba(71,85,105,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.3)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.40)_0%,rgba(139,92,246,0.2)_40%,transparent_80%)]
            dark:bg-[linear-gradient(to_right, rgba(71,85,105,0.15) 1px, transparent 1px),linear-gradient(to_bottom, rgba(71,85,105,0.15) 1px, transparent 1px),radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)]
            bg-[length:32px_32px,32px_32px,100%_100%] dark:bg-[length:30px_30px,30px_30px,100%_100%]"
        />
        <div className="relative z-40">
          <Navbar />
          <div className="container mx-auto px-4 md:px-10 overflow-hidden">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
