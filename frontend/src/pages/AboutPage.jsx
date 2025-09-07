import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AboutPage = () => {
  return (
    <section className="mt-20">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Masonary Images */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          {[assets.about, assets.about_1, assets.about_2, assets.about_3].map(
            (img, i) => (
              <img
                key={i}
                className="rounded-xl hover:scale-105 transition-transform duration-300"
                src={img}
                alt={`about-img-${i}`}
              />
            )
          )}
        </div>

        {/* About Content */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            About{" "}
            <span className="text-blue-600 dark:text-violet-500">TPI CPC</span>{" "}
            💻🌟
            <span className="block w-40 h-1 bg-black dark:bg-violet-500 rounded-full mt-2"></span>
          </h2>

          <p className="leading-relaxed text-base md:text-lg">
            <strong>TPI CPC</strong> is a vibrant community of students who love
            coding, problem-solving, and innovation. 💡 Our mission is to build
            a collaborative space where learners can sharpen skills, explore new
            technologies, and prepare for real-world challenges.
          </p>

          <p className="leading-relaxed text-base md:text-lg">
            🌟 We host{" "}
            <span className="font-medium">
              workshops 🛠️, seminars 🎤, hackathons 💡, and coding contests 🏆
            </span>{" "}
            to inspire members. From{" "}
            <span className="font-medium">skill growth 💪 & leadership 👑</span>{" "}
            to{" "}
            <span className="font-medium">
              career opportunities 📈 & networking 🌐
            </span>
            , TPI CPC helps every student shine. 🎯🔥
          </p>

          {/* Buttons */}
          <div className="pt-4 flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  target="_blank"
                  href="https://web.facebook.com/groups/tpicpc"
                  rel="noopener noreferrer"
                >
                  <Button variant="destructive">Join Our Community</Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Join Our Official Facebook Community</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  target="_blank"
                  href="https://web.facebook.com/TPICPCThakurgonPolytechnicInstitute"
                  rel="noopener noreferrer"
                >
                  <Button>Follow Us</Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow our Official Facebook Page</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
