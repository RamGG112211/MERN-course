import { useGlobalContext } from "../../context/GlobalContextProvider";
import DoctorsCarousel from "../home/DoctorsCarousel";
import Hero from "../home/Hero";

export default function Home() {
  const { user, login, logout } = useGlobalContext();

  return (
    <main>
      <Hero />
      <DoctorsCarousel />
    </main>
  );
}
