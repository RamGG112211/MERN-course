import { useGlobalContext } from "../../context/GlobalContextProvider";

export default function Home() {
  const { user, login, logout } = useGlobalContext();

  console.log("user: ", user);

  return <div>Home</div>;
}
