import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About Our Candle Store</h1>
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Welcome to our candle store! We are passionate about creating 
              handcrafted candles that bring warmth, light, and beautiful 
              aromas into your home. Each candle is carefully made with 
              premium ingredients and attention to detail.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide high-quality, eco-friendly candles 
              that enhance your living space and create a cozy atmosphere. 
              We believe in sustainable practices and use natural materials 
              whenever possible.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Why Choose Us</h2>
            <ul>
              <li>Handcrafted with care and attention to detail</li>
              <li>Premium quality materials</li>
              <li>Eco-friendly options available</li>
              <li>Wide variety of scents and styles</li>
              <li>Excellent customer service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;


