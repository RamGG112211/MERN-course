import Wrapper from "../global/Wrapper";
import Button from "../global/Button";
import SearchProviders from "./SearchProviders";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Wrapper className="relative pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 ">
      <div className="flex gap-3 items-center justify-between">
        <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          <div className=" flex flex-col gap-1 lg:gap-2">
            <h1 className=" font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
              <span className=" text-primary">Doctor</span>{" "}
              <span className="  text-white">Consultation</span>
            </h1>
            <p className=" text-sm md:text-base xl:text-lg max-w-[715px] text-white">
              Connect instantly with a specialist available 24/7 or opt for an
              in-person visit with a specific doctor.
            </p>
          </div>

          <Link to={"/doctors"} className=" w-fit">
            <Button>Consult Now</Button>
          </Link>
        </div>
      </div>

      <img
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        src="/images/hero.jpg"
        alt="hero-img"
      />

      {/* <!-- Overlay with primary color shade --> */}
      <div className="absolute top-0 left-0 bottom-0 right-0 inset-0 bg-primary/20"></div>

      {/*search doctors*/}
      <SearchProviders />
    </Wrapper>
  );
}
