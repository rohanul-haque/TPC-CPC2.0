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
import toast from "react-hot-toast";
import SectionTitle from "./SectionTitle";

const OurAdvisors = () => {
  const [advisorData, setAdvisorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { backendUrl } = useContext(AppContext);

  const fetchAdvisorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/advisor/list`);
      if (data.success) {
        setAdvisorData(data.advisorList);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch advisor data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisorData();
  }, []);

  return (
    <section className="mt-6">
      <SectionTitle
        title={"Meet Our Advisors 🌟🧑‍💼"}
        paragraph={`Learn from experienced mentors 💡 who guide you every step. Gain knowledge 📚, inspiration ✨, and support 🚀 to grow your skills and career.`}
      />

      <Carousel
        className="w-full mt-10"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex flex-col items-center p-6 rounded-2xl text-center border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm space-y-4">
                    <Skeleton className="w-28 h-28 rounded-full bg-gray-400/70 dark:bg-gray-600" />
                    <Skeleton className="h-5 w-32 bg-gray-400/70 dark:bg-gray-600" />
                    <Skeleton className="h-4 w-20 bg-gray-400/70 dark:bg-gray-600" />
                  </div>
                </CarouselItem>
              ))
            : advisorData?.map((advisor) => (
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
        <CarouselPrevious className={"hidden lg:flex"} />
        <CarouselNext className={"hidden lg:flex"} />
      </Carousel>
    </section>
  );
};

export default OurAdvisors;
