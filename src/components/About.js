import Logo from "../assets/img/inverted-commas.png";

const About = () => {
  return (
    <>
      <div className="about-mission">
        <img src={Logo} />
        <h1>
          Our mission is to elevate the quality of life for the urban consumer
          with unparalleled convenience. Convenience is what makes us tick. It's
          what makes us get out of bed and say, "Let's do this."
        </h1>
      </div>
      <div className="about-content">
        <h1>
          <center className="content content-one ">
            What's In Store For The Future?
          </center>
        </h1>
        <h4>
          <center className="content content-two ">
            FoodVilla has grand plans to be India's most loved hyperlocal
            player. It aims to be the most accessible platform on the network -
            reimagining the meaning of convenience in the country through a
            variety of service offerings.
          </center>
        </h4>
      </div>
      <hr></hr>
    </>
  );
};

export default About;
