import { FireworksBackground } from "@/components/animate-ui/backgrounds/fireworks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AppLayout = ({ children }) => {
  return (
    <main>
      <div className="min-h-screen w-full bg-white dark:bg-[#020617] relative">
        {/* White Sphere Grid Background */}
        <div
          className="absolute bg-fixed inset-0 z-0 bg-white  dark:bg-[#020617]
            bg-[linear-gradient(to_right,rgba(71,85,105,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.3)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.40)_0%,rgba(139,92,246,0.2)_40%,transparent_80%)] bg-[length:32px_32px,32px_32px,100%_100%] dark:bg-[linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)] bg-[length:30px_30px,30px_30px,100%_100%]"
        />
        <div className="relative">
          <Navbar />
          <div className="relative z-40 px-4 md:px-7 lg:px-16">{children}</div>
          <FireworksBackground className="h-screen fixed inset-0 rounded-xl" />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
