import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RotatingText } from "./animate-ui/text/rotating";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="pt-20">
      <div className="flex flex-col items-center text-center">
        {/* Welcome Text */}
        <span className="text-lg sm:text-xl font-medium">
          👋 Welcome to TPI CPC - Computer & Programming Club 🚀
        </span>
        {/* Heading */}
        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          Here at TPI CPC, you will Learn
          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
            <RotatingText
              text={[
                "Skill Development 💪",
                "Problem Solving 🧩",
                "Networking Opportunities 🌐",
                "Career Growth 📈",
                "Competitions 🏆",
                "Teamwork 🤝",
                "Leadership 👑",
                "Communication 🗣️",
                "Innovation 💡",
                "Critical Thinking 🧠",
                "Coding 💻",
              ]}
            />
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed">
          At TPI CPC, we bring together technology-loving students 💻, where
          everyone can learn something new 📚, write code 🖥️, and reach new
          heights 🚀 in the programming world together. 🎯 We organize
          competitions 🏆, workshops 🛠️, and various innovative activities 💡🌟
          here.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
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
              <p>Follow and Like our Official Facebook Page</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default Hero;
