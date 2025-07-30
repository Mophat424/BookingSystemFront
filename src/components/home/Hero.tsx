// // src/components/home/Hero.tsx
// import eventImage from '../../assets/images/event (1).jpg';
// import './Hero.css';

// export const Hero = () => {
//   return (
//     <div className="hero-container">
//       <div className="hero-content">
//         <h1 className="hero-title">Welcome to EventMaster!</h1>
//         <p className="hero-description">
//           Elevate your event experience with <span className="highlight">EventMaster</span> — the ultimate platform for booking and managing events.
//         </p>
//         <p className="hero-description">
//           Easily discover, book, and track events with real-time updates. Perfect for attendees and organizers alike.
//         </p>
//         <p className="hero-description">
//           Join today and unlock a world of seamless event management!
//         </p>
//       </div>
//       <div className="hero-image">
//         <img src={eventImage} alt="EventMaster Hero" />
//       </div>
//     </div>
//   );
// };

// src/components/home/Hero.tsx
import './Hero.css';

export const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to EventMaster!</h1>
        <p className="hero-description">
          Elevate your <span className="highlight">vibrant</span> event experience with <span className="highlight">EventMaster</span> — the ultimate platform for <span className="highlight">effortless</span> booking and managing events.
        </p>
        <p className="hero-description">
          Easily discover, book, and track <span className="highlight">unforgettable</span> events with real-time updates. Perfect for attendees and organizers alike.
        </p>
        <p className="hero-description">
          Join today and unlock a world of <span className="highlight">seamless</span> event management!
        </p>
      </div>
    </div>
  );
};