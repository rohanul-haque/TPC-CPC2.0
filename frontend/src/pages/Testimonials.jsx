import { testimonials } from "@/assets/assets";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Testimonials() {
  const anonymousFallbackImage =
    "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  // ✅ state for controlling how many reviews to show
  const [visibleCount, setVisibleCount] = useState(8);

  // ✅ function to load more reviews
  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="font-sans flex flex-col items-center px-4 sm:px-6 lg:px-8 mt-6">
      <SectionTitle
        title="🌟 Our Student Reviews"
        paragraph="📝 See what our students are saying about us! 💬 Their experiences, feedback, and success stories inspire us to grow and improve every day. 🚀"
      />

      {/* ✅ reviews grid */}
      <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {testimonials.slice(0, visibleCount).map((testimonial, index) => (
          <div
            key={index}
            className="border-gray-400/50 dark:border-gray-700 p-6 rounded-xl shadow-md break-inside-avoid border backdrop-blur-md"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = anonymousFallbackImage;
                }}
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.title}
                </p>
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Load More Button */}
      {visibleCount < testimonials.length && (
        <Button
          className={"cursor-pointer mt-10"}
          variant={"destructive"}
          onClick={loadMore}
        >
          More Reviews
        </Button>
      )}
    </div>
  );
}

export default Testimonials;
