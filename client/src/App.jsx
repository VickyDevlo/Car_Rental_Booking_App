import { Footer, Login, Navbar } from "./components";
import { useLocation } from "react-router-dom";
import { Router } from "./components/Router";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import { PageUP } from "./components/shared/PageUp";

function App() {
  const { showLogin } = useAppContext();
  const location = useLocation();

  const isOwnerPath = location.pathname.startsWith("/owner");
  const isChangePassword = location.pathname === "/change-password";

  const hideNavbar = isOwnerPath || isChangePassword;

  return (
    <>
      <Toaster />
      <PageUP />
      {showLogin && <Login />}
      {!hideNavbar && <Navbar />}
      <Router />
      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;
