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
import SectionTitle from "./SectionTitle";

const OurTeamMember = ({ teamMemberData = [], loading, error }) => {
  return (
    <section className="mt-6 lg:px-10">
      <SectionTitle
        title={`Meet Our Team Members ${new Date().getFullYear()} 👥✨`}
        paragraph="Meet our talented team 🤝. Each member brings passion, creativity 🎨, and dedication 🚀. Together, we learn, collaborate, and create amazing things 🌟!"
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

      {!loading && (error || teamMemberData.length === 0) && (
        <div className="w-full flex justify-center items-center py-10">
          <Error
            title={
              error
                ? "🚫 No team members found yet!"
                : "🚫 No team members found yet!"
            }
            description={
              error
                ? "🌟 Stay tuned, new member will join soon 🎉"
                : "🌟 Stay tuned, new member will join soon 🎉"
            }
          />
        </div>
      )}

      {!loading && !error && teamMemberData.length > 0 && (
        <Carousel
          className="w-full mt-10"
          plugins={[Autoplay({ delay: 2500 })]}
        >
          <CarouselContent>
            {teamMemberData
              .slice()
              .reverse()
              .map((member) => {
                return (
                  <CarouselItem
                    key={member?._id}
                    className="pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="flex flex-col items-center p-6 rounded-2xl text-center border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm">
                      <img
                        className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md mb-4"
                        src={member?.memberProfile}
                        alt={member?.name}
                        loading="lazy"
                      />
                      <h1 className="text-lg font-semibold uppercase">
                        {member?.name}
                      </h1>
                      <span className="text-sm opacity-80">
                        {member?.position}
                      </span>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      )}
    </section>
  );
};

export default OurTeamMember;
