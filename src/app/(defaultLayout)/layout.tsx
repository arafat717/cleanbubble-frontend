import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
