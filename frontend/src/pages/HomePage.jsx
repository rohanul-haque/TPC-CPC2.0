import Counter from "@/components/Counter";
import Hero from "@/components/Hero";
import OurAdvisors from "@/components/OurAdvisors";
import OurTeamMember from "@/components/OurTeamMember";
import WhyJoin from "@/components/WhyJoin";
import { HomePageDataContext } from "@/contexts/HomePageDataContext";
import { useContext } from "react";
import AboutPage from "./AboutPage";
import BlogPage from "./BlogPage";
import ContactPage from "./ContactPage";
import EventPage from "./EventPage";
import Faqs from "./Faqs";
import Testimonials from "./Testimonials";

const HomePage = () => {
  const {
    advisorData,
    teamMemberData,
    eventData,
    blogData,
    reviewData,
    loading,
    error,
  } = useContext(HomePageDataContext);

  return (
    <>
      <Hero />
      <Counter />
      <AboutPage />
      <WhyJoin />
      <div className="mt-16"></div>
      <OurAdvisors advisorData={advisorData} loading={loading} error={error} />
      <OurTeamMember
        teamMemberData={teamMemberData}
        loading={loading}
        error={error}
      />
      <div className="mt-16"></div>
      <EventPage eventData={eventData} loading={loading} error={error} />
      <div className="mt-16"></div>
      <BlogPage blogData={blogData} loading={loading} error={error} />
      <div className="mt-16"></div>
      <Testimonials reviewData={reviewData} loading={loading} error={error} />
      <div className="mt-16"></div>
      <Faqs />
      <div className="mt-16"></div>
      <ContactPage />
    </>
  );
};

export default HomePage;
