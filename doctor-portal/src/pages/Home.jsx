import { useGlobalContext } from "../context/GlobalContextProvider";
import Hero from "../components/home/Hero";
import DoctorsCarousel from "../components/home/DoctorsCarousel";
import VideoCallButton from "../components/video-call/VideoCallButton";

export default function Home() {
  const { user, login, logout } = useGlobalContext();

  return (
    <main>
      <Hero />
      <DoctorsCarousel />

      <VideoCallButton />
    </main>
  );
}
