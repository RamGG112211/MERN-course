/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../global/Loading";
import DoctorCard from "../doctors/DoctorCard";
import { doctors_data } from "../../utils/data";
import Wrapper from "../global/Wrapper";
import { apiRequest } from "../../utils/auth/apiRequest";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-next !text-primary !bg-primary rounded-full "
    onClick={onClick}
  >
    <i className="fas fa-chevron-right"></i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-prev !text-primary !bg-primary rounded-full "
    onClick={onClick}
  >
    <i className="fas fa-chevron-left"></i>
  </div>
);

const DoctorsCarousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed (ms)
    arrows: true,
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom previous arrow
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint for responsive behavior
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // Adjust breakpoint for responsive behavior
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200, // Adjust breakpoint for responsive behavior
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1800, // Adjust breakpoint for responsive behavior
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await apiRequest({
        url: "/doctors",
        method: "GET",
      });
      console.log(res);
      
      setDoctors(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    console.log("doctors: ", doctors);
  }, [doctors]);

  return (
    <Wrapper className=" py-8 pb-20 mt-20">
      <div className=" mx-auto flex flex-col gap-5 2xl:gap-10 py-6 bg-Background">
        <div className="flex sm:flex-row flex-col items-center justify-between ">
          <p className="font-bold sm:text-2xl text-xl  text-primary">
            {" "}
            Doctors Nearby
          </p>
          <Link to={"/doctors"}>
            <button className="hover:underline text-primary flex flex-row items-center ">
              Browse All doctors <IoIosArrowForward className=" text-lg" />{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 justify-center"></div>

      {doctors && doctors.length <= 0 ? (
        <div className="py-10">
          <Loading />
        </div>
      ) : (
        <Slider {...settings} className="">
          {doctors &&
            doctors.slice(0, 6).map((doctor) => {
              const { _id } = doctor;
              return <DoctorCard key={_id} doctor={doctor} />;
            })}
        </Slider>
      )}

      {/* <p className='text-center m-10'>O O O O</p> */}
    </Wrapper>
  );
};

export default DoctorsCarousel;
