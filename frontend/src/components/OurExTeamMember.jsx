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

const OurExTeamMember = () => {
  const [teamExMemberData, setTeamExMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { backendUrl } = useContext(AppContext);

  const fetchTeamMemberData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/ex-team/list`);

      if (data.success && data.members?.length > 0) {
        setTeamExMemberData(data.members.reverse());
        setError("");
      } else {
        setTeamExMemberData([]);
        setError("🚫 No team members found yet! 🌟 Stay tuned for updates 🎉");
      }
    } catch (err) {
      setTeamExMemberData([]);
      setError("🚫 Failed to fetch team members. Please try again later 🌟");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMemberData();
  }, []);

  if (loading) {
    return (
      <section className="mt-15 px-10">
        <SectionTitle
          title={`Meet Our Ex Team Members 👥✨`}
          paragraph="Our former team members 💼 have contributed their skills, passion 🎨, and dedication 🚀 to help build our journey. Their hard work, creativity, and collaboration 🌟 continue to inspire us even after they’ve moved on. 🙌"
        />
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
      </section>
    );
  }

  if (!teamExMemberData.length || error) {
    return (
      <section className="mt-15 px-10">
        <SectionTitle
          title={`Meet Our Ex Team Members 👥✨`}
          paragraph="Our former team members 💼 have contributed their skills, passion 🎨, and dedication 🚀 to help build our journey. Their hard work, creativity, and collaboration 🌟 continue to inspire us even after they’ve moved on. 🙌"
        />
        <div className="w-full flex justify-center items-center py-10">
          <Error
            title={"🚫 No ex-team members found yet!"}
            description="🌟 Stay tuned, new ex-member will join soon 🎉"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-15 px-10">
      <SectionTitle
        title={`Meet Our Ex Team Members 👥✨`}
        paragraph="Our former team members 💼 have contributed their skills, passion 🎨, and dedication 🚀 to help build our journey. Their hard work, creativity, and collaboration 🌟 continue to inspire us even after they’ve moved on. 🙌"
      />
      <Carousel className="w-full mt-10" plugins={[Autoplay({ delay: 2000 })]}>
        <CarouselContent>
          {teamExMemberData.map((team) => (
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
                <span>{team?.position}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </section>
  );
};

export default OurExTeamMember;
