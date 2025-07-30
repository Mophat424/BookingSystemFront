// src/components/about/About.tsx
import concertImage from '../../assets/images/concert (1).jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src={concertImage} alt="EventMaster About" />
      </div>
      <div className="about-content">
        <h1 className="about-title">About EventMaster</h1>
        <p className="about-description">
          EventMaster is a powerful platform designed to simplify event discovery, booking, and management for everyone.
        </p>
        <p className="about-description">
          With EventMaster, you can effortlessly find events, book tickets, and manage your schedule, ensuring a seamless experience.
        </p>
        <p className="about-description">
          Whether you’re an attendee or an organizer, EventMaster provides the tools to make every event a success.
        </p>
      </div>
    </div>
  );
};

export default About;