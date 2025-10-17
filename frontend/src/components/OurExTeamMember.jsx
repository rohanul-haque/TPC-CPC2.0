import { Error } from "@/components/Error";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useMemo, useRef } from "react";
import SectionTitle from "./SectionTitle";

const OurExTeamMember = ({ exTeamData = [], loading, error }) => {
  console.log(exTeamData);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  const reversedMembers = useMemo(
    () => [...exTeamData].reverse(),
    [exTeamData]
  );

  return (
    <section className="mt-6 lg:px-10">
      <SectionTitle
        title="Meet Our Ex Team Members 👥✨"
        paragraph="Our former team members 💼 have contributed their skills, passion 🎨, and dedication 🚀 to help build our journey. Their creativity and collaboration 🌟 continue to inspire us even after they’ve moved on. 🙌"
      />

      {loading && (
        <Carousel className="w-full mt-10" plugins={[autoplayPlugin.current]}>
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

      {!loading && (error || exTeamData.length === 0) && (
        <div className="w-full flex justify-center items-center py-10">
          <Error
            title="🚫 No ex team members found!"
            description="🌟 Stay tuned — new members will join soon 🎉"
          />
        </div>
      )}

      {!loading && !error && reversedMembers.length > 0 && (
        <Carousel className="w-full mt-10" plugins={[autoplayPlugin.current]}>
          <CarouselContent>
            {reversedMembers.map((member) => (
              <CarouselItem
                key={member?._id}
                className="pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col items-center p-6 rounded-2xl text-center border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <img
                    className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md mb-4"
                    src={member?.memberProfile}
                    alt={member?.name}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    loading="lazy"
                  />
                  <h1 className="text-lg font-semibold uppercase text-gray-900 dark:text-white">
                    {member?.name}
                  </h1>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {member?.position}
                  </span>
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

export default OurExTeamMember;
