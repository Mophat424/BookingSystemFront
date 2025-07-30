// src/components/about/Testimonials.tsx
import { testimonialsData } from "./testimonialdata";
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <p className="testimonial-content">&quot;{testimonial.content}</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <span className="testimonial-role">{testimonial.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 