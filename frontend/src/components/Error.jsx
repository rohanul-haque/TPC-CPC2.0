export const Error = ({ title, description }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">{description}</p>
    </div>
  );
};
