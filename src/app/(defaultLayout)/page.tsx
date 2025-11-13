import CTASection from "@/components/home/cta-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonial";
import TopAndFeatureJob from "@/components/home/top-and-feature-job";

const HomePage = () => {
  return (
    <div className="min-h-screen ">

      <main>
        <HeroSection />
        <div className="">
          <HowItWorks />
          <TopAndFeatureJob />
          {/* <ServicesSection />
          <LatestJobs /> */}
          <Testimonials />
        </div>
        <CTASection />
      </main>
    </div>
  )
}

export default HomePage;
