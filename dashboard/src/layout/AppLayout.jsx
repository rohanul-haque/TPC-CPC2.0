import Navbar from "@/components/ui/Navbar";

const AppLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AppLayout;
