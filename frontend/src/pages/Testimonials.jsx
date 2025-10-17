import { Error } from "@/components/Error";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Testimonials({ reviewData = [], loading, error }) {
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  const showReviews = reviewData.slice(0, visibleCount);

  return (
    <section className="font-sans flex flex-col items-center mt-6">
      <SectionTitle
        title="🌟 Our Student Reviews"
        paragraph="📝 See what our students are saying about us! 💬 Their experiences, feedback, and success stories inspire us to grow and improve every day. 🚀"
      />

      {!loading && reviewData.length === 0 && (
        <Error
          title="🚫 No student reviews yet!"
          description={error || "Be the first to share your thoughts! ✨"}
        />
      )}

      {(loading || reviewData.length > 0) && (
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {loading
            ? Array.from({ length: visibleCount }).map((_, index) => (
                <div
                  key={index}
                  className="border-gray-400/50 dark:border-gray-700 p-6 rounded-xl shadow-md border backdrop-blur-md break-inside-avoid"
                >
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full mb-2" />
                  <Skeleton className="h-4 w-1/3 mt-4" />
                </div>
              ))
            : showReviews
                .slice()
                .reverse()
                .map((review) => (
                  <div
                    key={review._id}
                    className="border-gray-400/50 dark:border-gray-700 p-6 rounded-xl shadow-md border backdrop-blur-md break-inside-avoid"
                  >
                    <div className="flex items-center mb-4 border-b border-gray-400 pb-4">
                      <img
                        src={review.profileImage}
                        alt={review.fullName}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {review.fullName}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <p className="capitalize">
                            {review.department.slice(0, 8)}...
                          </p>
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                      {review.reviewMessage || "📝 No review message provided"}
                    </p>

                    <div className="border-t border-gray-400 pt-3 mt-4 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
                      <p>{review.shift || "N/A"} Shift</p>
                      <span>
                        {review.semester
                          ? `${review.semester}th Semester`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
        </div>
      )}

      {!loading &&
        visibleCount < reviewData.length &&
        reviewData.length > 0 && (
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
