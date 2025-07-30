import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 EventMaster. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms</a> |
          <a href="/privacy">Privacy</a> |
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;