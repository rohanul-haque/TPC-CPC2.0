import { Error } from "@/components/Error";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { useContext, useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

const OurAdvisors = () => {
  const [advisorData, setAdvisorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { backendUrl } = useContext(AppContext);

  const fetchAdvisorData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/advisor/list`);

      if (data.success && data.advisors?.length > 0) {
        setAdvisorData(data.advisors.reverse());
        setError("");
      } else {
        setAdvisorData([]);
        setError(
          "🚫 No advisors found yet! 🌟 Stay tuned, new mentors will join soon 🎉"
        );
      }
    } catch (err) {
      setAdvisorData([]);
      setError("🚫 Failed to fetch advisor data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisorData();
  }, []);

  return (
    <section className="mt-6 px-10">
      <SectionTitle
        title={`Meet Our Advisors ${new Date().getFullYear()} 🌟🧑‍💼`}
        paragraph="Learn from experienced mentors 💡 who guide you every step. Gain knowledge 📚, inspiration ✨, and support 🚀 to grow your skills and career."
      />

      {loading && (
        <Carousel
          className="w-full mt-10"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, i) => (
              <CarouselItem key={i} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col items-center p-6 rounded-2xl text-center border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm space-y-4">
                  <Skeleton className="w-28 h-28 rounded-full bg-gray-400/70 dark:bg-gray-600" />
                  <Skeleton className="h-5 w-32 bg-gray-400/70 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-20 bg-gray-400/70 dark:bg-gray-600" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {!loading && error && (
        <div className="w-full flex justify-center items-center py-10">
          <Error
            title={"🚫 No advisors found yet!"}
            description="🌟 Stay tuned, new mentors will join soon 🎉"
          />
        </div>
      )}

      {!loading && !error && advisorData.length > 0 && (
        <Carousel
          className="w-full mt-10"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {advisorData.map((advisor) => (
              <CarouselItem
                key={advisor._id}
                className="pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col items-center p-6 rounded-2xl text-center border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm">
                  <img
                    className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md mb-4"
                    src={advisor?.advisorProfile}
                    alt={advisor?.name}
                  />
                  <h1 className="text-lg font-semibold uppercase">
                    {advisor?.name}
                  </h1>
                  <span>{advisor?.role}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      )}
    </section>
  );
};

export default OurAdvisors;
