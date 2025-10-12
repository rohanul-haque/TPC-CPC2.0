import { Error } from "@/components/Error";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

function Testimonials() {
  const anonymousFallbackImage =
    "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  const [visibleCount, setVisibleCount] = useState(8);
  const [reviewList, setReviewList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { backendUrl } = useContext(AppContext);

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  const fetchReviewList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/review/list`);
      if (data.success && data.reviews?.length > 0) {
        setReviewList(data.reviews.reverse());
        setError("");
      } else {
        setReviewList([]);
        setError("🚫 No reviews found! Stay tuned for new feedback 🎉");
      }
    } catch (err) {
      console.error(err);
      setReviewList([]);
      setError("🚫 Failed to fetch reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewList();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section className="font-sans flex flex-col items-center mt-6">
      <SectionTitle
        title="🌟 Our Student Reviews"
        paragraph="📝 See what our students are saying about us! 💬 Their experiences, feedback, and success stories inspire us to grow and improve every day. 🚀"
      />

      {!loading && reviewList.length === 0 && error && (
        <div className="w-full flex justify-center items-center">
          <Error
            title="🚫 No student reviews yet!"
            description={error || "Be the first to share your thoughts! ✨"}
          />
        </div>
      )}

      {/* Reviews / Skeletons */}
      {reviewList.length > 0 || loading ? (
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {loading
            ? Array.from({ length: visibleCount }).map((_, index) => (
                <div
                  key={index}
                  className="border-gray-400/50 dark:border-gray-700 p-6 rounded-xl shadow-md break-inside-avoid border backdrop-blur-md"
                >
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-12 h-12 rounded-full mr-4 bg-gray-400/70 dark:bg-gray-600" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton className="h-4 w-3/4 bg-gray-400/70 dark:bg-gray-600" />
                      <Skeleton className="h-3 w-1/2 bg-gray-400/70 dark:bg-gray-600" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full mb-2 bg-gray-400/70 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-1/3 mt-4 bg-gray-400/70 dark:bg-gray-600" />
                </div>
              ))
            : reviewList.slice(0, visibleCount).map((review) => (
                <div
                  key={review._id}
                  className="border-gray-400/50 dark:border-gray-700 p-6 rounded-xl shadow-md break-inside-avoid border backdrop-blur-md"
                >
                  <div className="flex items-center mb-4 border-b border-gray-400 pb-4">
                    <img
                      src={review.profileImage || anonymousFallbackImage}
                      alt={review.fullName || "Anonymous"}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        if (e.currentTarget.src !== anonymousFallbackImage) {
                          e.currentTarget.src = anonymousFallbackImage;
                        }
                      }}
                    />
                    <div className="w-full">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {review.fullName || "Anonymous"}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="capitalize">
                          {(review.department || "CST").slice(0, 8)}...
                        </p>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                    {review.reviewMessage || "📝 No review message provided"}
                  </p>
                  <div className="border-t border-gray-400 pt-3 mt-4">
                    <div className="flex items-center justify-between">
                      <p className="capitalize">
                        {review.shift || "N/A"} Shift
                      </p>
                      <span className="capitalize">
                        {review.semester
                          ? `${review.semester}th Semester`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : null}

      {!loading &&
        visibleCount < reviewList.length &&
        reviewList.length > 0 && (
          <Button
            className="cursor-pointer mt-10"
            variant="destructive"
            onClick={loadMore}
          >
            More Reviews
          </Button>
        )}
    </section>
  );
}

export default Testimonials;
