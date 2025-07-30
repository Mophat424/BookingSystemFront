// // src/pages/LandingPage.tsx
// import Testimonials from "../components/about/Testimonials";
// import Footer from "../components/footer/Footer";
// import { Hero } from "../components/home/Hero";
// import Services from "../components/home/Services";
// import Nav from "../components/nav/Nav";

// const LandingPage = () => {
//   return (
//     <div>
//       <Nav />
//       <Hero />
//       <Services />
//       <Testimonials />
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;





// src/pages/LandingPage.tsx
import Footer from "../components/footer/Footer";
import { Hero } from "../components/home/Hero";
import Nav from "../components/nav/Nav";
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Nav />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;