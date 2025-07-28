import { Footer, Login, Navbar } from "./components";
import { useLocation } from "react-router-dom";
import { Router } from "./components/Router";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

function App() {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      <Toaster />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}

      <Router />
      {!isOwnerPath && <Footer />}
    </>
  );
}

export default App;
