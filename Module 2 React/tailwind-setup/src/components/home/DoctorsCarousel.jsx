import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../global/Loading";
import DoctorCard from "../doctors/DoctorCard";
import { doctors_data } from "../../utils/data";

const DoctorsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed (ms)
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

  const [doctors, setDoctors] = useState(doctors_data);

  const fetchDoctors = async () => {
    try {
      //   const res = await apiRequest({
      //     url: "/doctors",
      //     method: "GET",
      //   });
      // console.log(res);
      //   setDoctors(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className=" py-8 pb-20 padding">
      <div className=" mx-auto flex flex-col gap-5 2xl:gap-10 py-6 bg-Background">
        <div className="flex sm:flex-row flex-col items-center justify-between ">
          <p className="font-bold sm:text-2xl text-xl  text-primary">
            {" "}
            Doctors Nearby
          </p>
          <Link to={"/doctors"}>
            <button className="hover:underline text-md sm:text-lg text-primary flex flex-row items-center ">
              Browse All doctors <IoIosArrowForward />{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 justify-center"></div>

      {doctors.length <= 0 ? (
        <div className="py-10">
          <Loading />
        </div>
      ) : (
        <Slider {...settings} className="">
          {doctors.slice(0, 6).map((doctor) => {
            const { id } = doctor;
            return <DoctorCard key={id} doctor={doctor} />;
          })}
        </Slider>
      )}

      {/* <p className='text-center m-10'>O O O O</p> */}
    </div>
  );
};

export default DoctorsCarousel;
