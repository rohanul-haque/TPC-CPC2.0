import { counterNumber } from "@/assets/assets";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <section className="mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center">
          {counterNumber.map((item) => (
            <div
              key={item.id}
              className="p-6 flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                <CountUp
                  enableScrollSpy={true}
                  start={0}
                  end={item.value}
                  duration={2.75}
                  suffix="+"
                />
              </h2>
              <p className="mt-2 text-lg sm:text-xl font-medium">
                {item.title}
              </p>
            </div>
          ))}

          {/* Optional static counter */}
          <div className="p-6 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
              <CountUp
                enableScrollSpy={true}
                start={0}
                end={24}
                duration={2.75}
                suffix="/"
              />
              <CountUp
                enableScrollSpy={true}
                start={0}
                end={7}
                duration={2.75}
              />
            </h2>
            <p className="mt-2 text-lg sm:text-xl font-medium">Support 🤝</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
