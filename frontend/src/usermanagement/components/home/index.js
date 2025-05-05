import React, { useState } from "react";
import Navbar from "../header/Navbar";
import first from "./../home/home.jpg";
import second from "./../home/one.jpg";
import third from "./../home/home.jpg";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import axios from "axios";
import Footer from "../footer/footer";

AOS.init({
  duration: "2500",
});

function Homepage() {
  const FirstSection = () => {
    const [drivercode, setdrivercode] = useState("");
    const [error, seterror] = useState("");

    async function DLogin() {
      const driver = {
        drivercode,
      };
      
      try {
        const result = await axios.post('/api/drivers/dlogin', driver);
        localStorage.setItem('currentdriver', JSON.stringify(result));
        window.location.href = '/j_driverprofile'
        
      } catch (error) {
        console.log(error);
        seterror(true)
      }
      
    }
    
    
    

    return (
      <div>
        <div className="flex flex-col justify-center text-white bg-white ">
          <div
            className="bg-cover  bg-center min-h-screen bg-local"
            style={{ backgroundImage: `url(${first})` }}
          >
            <Navbar />
            
                <div className="flex overflow-hidden flex-col items-center justify-center px-12 py-20 w-full min-h-screen max-h-screen max-md:px-5 max-md:max-w-full">
                  <div
                    data-aos="zoom-in"
                    className="relative mt-20 text-7xl font-semibold tracking-wide max-md:mt-10 max-md:max-w-full max-md:text-4xl"
                  >
                    Skill Lab
                  </div>
                  <div
                    data-aos="zoom-in"
                    className="relative mt-7 text-2xl font-light tracking-widest max-md:max-w-full"
                  >
                    Online Freelance Platform
                  </div>
                  <Link to="/c_displayitem">
                    <button
                      data-aos="zoom-out"
                      className="relative justify-center px-12 py-4 mt-10 text-xl tracking-widest text-center rounded-3xl border border-neutral-300 bg-white bg-opacity-50 hover:bg-opacity-70 transition duration-300 ease-in-out max-md:px-5 max-md:my-10"
                    >
                      Learn More
                    </button>
                  </Link>
                </div>
          </div>
        </div>
      </div>
    );
  };

  const SecondSection = () => {
    return (
      <div className="flex flex-col items-center p-10 border border-black border-solid border-opacity-10 bg-neutral-100 max-md:px-5">
        <div
          data-aos="fade-down"
          className="mt-4 text-6xl font-light text-center text-black leading-[67.76px] tracking-[8.37px] max-md:text-4xl"
        >
          ABOUT US
        </div>
        <div className="mt-40 w-full max-w-screen-xl max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
              <div
                data-aos="fade-right"
                className="self-stretch my-auto text-sm font-light tracking-wider text-center text-black max-md:mt-10 max-md:max-w-full"
              >
                 At TechSolutions, we're dedicated to transforming industries through cutting-edge technology and innovative solutions.
                 With years of combined expertise in IT and digital transformation, our passionate team is at the forefront of 
                 technological advancements, continuously exploring new ways to empower businesses and drive digital success. Our
                 commitment to sustainability in the tech space pushes us to develop solutions that notonly enhance performance and 
                  scalability but also minimize energy consumption and optimize resources.
                  <br />
                  At TechSolutions, we're dedicated to transforming industries through cutting-edge technology and innovative solutions.
                 With years of combined expertise in IT and digital transformation, our passionate team is at the forefront of 
                 technological advancements, continuously exploring new ways to empower businesses and drive digital success
                 
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
              <img
                data-aos="fade-left"
                loading="lazy"
                srcSet="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
                className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full rounded-[15px] grow w-full aspect-[1.49] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ThirdSection = () => {
    return (
      <div className="flex flex-col p-20 border border-black border-solid border-opacity-10 bg-neutral-100 max-md:px-5">
        <div
          data-aos="fade-down"
          className="self-center mt-4 text-6xl font-light text-center text-black leading-[67.76px] tracking-[8.37px] max-md:max-w-full max-md:text-4xl"
        >
          WHAT WE DO
        </div>
        <div className="self-start mt-44 ml-3.5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
              <img
                data-aos="fade-right"
                loading="lazy"
                srcSet="https://onlinecs.baylor.edu/sites/default/files/field/image/shutterstock_1756116146%20-%201200x628%2016_9%20%281%29.jpg"
                className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full rounded-[15px] grow w-full aspect-[1.49] max-md:mt-10 max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
              <div
                data-aos="fade-left"
                className="self-stretch my-auto text-sm font-light tracking-wider text-center text-black max-md:mt-10 max-md:max-w-full"
              >
                 At TechSolutions, we're dedicated to transforming industries through cutting-edge technology and innovative solutions.
                 With years of combined expertise in IT and digital transformation, our passionate team is at the forefront of 
                 technological advancements, continuously exploring new ways to empower businesses and drive digital success. Our
                 commitment to sustainability in the tech space pushes us to develop solutions that notonly enhance performance and 
                  scalability but also minimize energy consumption and optimize resources.
                  <br />
                  At TechSolutions, we're dedicated to transforming industries through cutting-edge technology and innovative solutions.
                 With years of combined expertise in IT and digital transformation, our passionate team is at the forefront of 
                 technological advancements, continuously exploring new ways to empower businesses and drive digital success
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FourthSection = () => {
    return (
      <div className="flex flex-col p-20 border border-black border-solid border-opacity-10 bg-neutral-100 max-md:px-5">
        <div
          data-aos="fade-down"
          className="self-center mt-4 text-6xl font-light text-center text-black leading-[67.76px] tracking-[8.37px] max-md:max-w-full max-md:text-4xl"
        >
          CONTACT US
        </div>
        <div className="mt-36 max-md:mt-10 max-md:mr-2 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
              <div
                data-aos="fade-right"
                className="self-stretch my-auto text-sm font-light tracking-wider text-center text-black max-md:mt-10 max-md:max-w-full"
              >
                 At TechSolutions, we're dedicated to transforming industries through cutting-edge technology and innovative solutions.
                 With years of combined expertise in IT and digital transformation, our passionate team is at the forefront of 
                 technological advancements, continuously exploring new ways to empower businesses and drive digital success. Our
                 commitment to sustainability in the tech space pushes us to develop solutions that notonly enhance performance and 
                  scalability but also minimize energy consumption and optimize resources.
                  <br />
                  At TechSolutions, we're dedicated to transforming industries through cutting-edge technology and innovative solutions.
                 With years of combined expertise in IT and digital transformation, our passionate team is at the forefront of 
                 technological advancements, continuously exploring new ways to empower businesses and drive digital success
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
              <img
                data-aos="fade-left"
                loading="lazy"
                srcSet="https://st4.depositphotos.com/1441511/20465/i/450/depositphotos_204651444-stock-photo-programmers-working-software-office-team.jpg"
                className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full rounded-[15px] grow w-full aspect-[1.49] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FifthSection = () => {
    return (
      <div className="flex flex-col items-center px-16 pt-6 pb-20 text-center bg-white leading-[121%] max-md:px-5">
        <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 w-full max-w-[1191px] min-h-[500px] max-md:px-5 max-md:max-w-full">
          <div className="flex">
            <div
              data-aos="fade-right"
              className=" mr-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={first} alt="dddd" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Collaborative Team Dynamics
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Explore how our cohesive team works together seamlessly,
                  leveraging each other's strengths to overcome challenges and
                  deliver exceptional results at every stage of the operation.
                </p>
              </div>
            </div>
            <div
              data-aos="zoom in"
              className="mr-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={first} alt="dddd" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Customer Care Excellence
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Discover how we prioritize customer satisfaction through
                  prompt assistance and personalized service, ensuring every
                  customer feels valued and supported.
                </p>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={first} alt="dddd" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Learn New Skills
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unlock your potential with our interactive courses! From coding to design,
                 master in-demand skills with expert-led tutorials and hands-on projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>

      <FirstSection />
      <FifthSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer/>
    </div>
  );
}

export default Homepage;
