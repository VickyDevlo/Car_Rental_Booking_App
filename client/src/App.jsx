import { useState } from "react";
import { Footer, Login, Navbar } from "./components";
import { useLocation } from "react-router-dom";
import { Router } from "./components/Router";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <div>
      {showLogin && <Login setShowLogin={setShowLogin} showLogin={showLogin}/>}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Router />
      {!isOwnerPath && <Footer />}
    </div>
  );
}

export default App;
