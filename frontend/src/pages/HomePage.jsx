import Counter from "@/components/Counter";
import Hero from "@/components/Hero";
import OurAdvisors from "@/components/OurAdvisors";
import OurTeamMember from "@/components/OurTeamMember";
import WhyJoin from "@/components/WhyJoin";
import AboutPage from "./AboutPage";
import BlogPage from "./BlogPage";
import ContactPage from "./ContactPage";
import EventPage from "./EventPage";
import Faqs from "./Faqs";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Counter />
      <AboutPage />
      <WhyJoin />
      <div className="mt-16"></div>
      <OurAdvisors />
      <OurTeamMember />
      <div className="mt-16"></div>
      <EventPage />
      <div className="mt-16"></div>
      <BlogPage />
      <div className="mt-16"></div>
      <Testimonials />
      <div className="mt-16"></div>
      <Faqs />
      <div className="mt-16"></div>
      <ContactPage />
    </>
  );
};

export default HomePage;
