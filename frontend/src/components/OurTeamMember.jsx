import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import SectionTitle from "./SectionTitle";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const OurTeamMember = () => {
  const [teamMemberData, setTeamMemberData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { backendUrl } = useContext(AppContext);

  const OurTeamMemberDataFetch = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/team/list`);
      if (data.success) {
        setTeamMemberData(data.teamList);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch team member data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    OurTeamMemberDataFetch();
  }, []);

  return (
    <section className="mt-15">
      <SectionTitle
        title={"Meet Our Team Members 👥✨"}
        paragraph={`Meet our talented team 🤝. Each member brings passion, creativity 🎨, and dedication 🚀. Together, we learn, collaborate, and create amazing things 🌟!`}
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
            : teamMemberData?.map((team) => (
                <CarouselItem
                  key={team._id}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex flex-col items-center p-6 rounded-2xl text-center border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm">
                    <img
                      className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md mb-4"
                      src={team?.memberProfile}
                      alt={team?.name}
                    />
                    <h1 className="text-lg font-semibold uppercase">
                      {team?.name}
                    </h1>
                    <span>{team?.role}</span>
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

export default OurTeamMember;
