// src/components/home/Services.tsx
import eventImage from '../../assets/images/event (1).jpg';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-image">
        <img src={eventImage} alt="Our Services" />
      </div>
      <div className="services-content">
        <h2 className="services-title">Our Services</h2>
        <p className="services-description">
          Explore the services EventMaster offers to enhance your event experience. From booking to management, we’ve got it all!
        </p>
        <table className="services-table">
          <thead>
            <tr>
              <th></th>
              <th>Service</th>
              <th>Benefit</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Event Booking</td>
              <td>Quick ticket purchases</td>
              <td>24/7</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Dashboard Access</td>
              <td>Real-time tracking</td>
              <td>24/7</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event Management</td>
              <td>Organize with ease</td>
              <td>24/7</td>
            </tr>
          </tbody>
        </table>
        <button className="services-button">Get Started</button>
      </div>
    </div>
  );
};

export default Services;