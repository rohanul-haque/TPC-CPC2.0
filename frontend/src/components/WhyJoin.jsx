import { whyJoinTPICPC } from "@/assets/assets";
import SectionTitle from "./SectionTitle";

const WhyJoin = () => {
  return (
    <section className="mt-20">
      {/* Section Title */}
      <SectionTitle
        title={"Why Join TPI CPC? 🤔"}
        paragraph={`Joining TPI CPC means being part of a vibrant tech community ✨ where you grow your coding skills 📚, explore new tech 🔍, and build leadership qualities 👑.`}
      />

      {/* Cards Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyJoinTPICPC.map((card) => (
          <div
            key={card.id}
            className="border border-gray-400/60 dark:border-gray-600/60 backdrop-blur-md p-6 rounded-xl flex flex-col items-center text-center"
          >
            {/* Emoji Icon */}
            <div className="text-5xl mb-4">{card.logo}</div>

            {/* Title */}
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h4>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyJoin;
