const SectionTitle = ({ title, paragraph }) => {
  return (
    <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h1>

      {/* Decorative underline */}
      <div className="mt-2 flex justify-center">
        <span className="w-40 h-1 bg-black dark:bg-violet-500 rounded-full "></span>
      </div>

      {/* Paragraph */}
      <p className="mt-6 text-base md:text-[17px] leading-relaxed">
        {paragraph}
      </p>
    </div>
  );
};

export default SectionTitle;
