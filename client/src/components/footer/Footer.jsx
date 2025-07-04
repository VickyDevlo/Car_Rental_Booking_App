import { useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="text-gray-500 px-6 md:px-16 lg:px-24 xl:px-32 mt-12 text-sm bg-light">
      <div className="container mx-auto flex flex-wrap justify-between items-start gap-8 md:gap-8 p-6">
        <div className="">
          <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                alt="twitter"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img src={assets.gmail_logo} alt="mail" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-medium uppercase text-gray-800">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            {menuLinks.map((menu, i) => (
              <li
                key={i}
                onClick={() => {
                  navigate(menu.path);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer"
              >
                {menu.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-medium uppercase text-gray-800">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-medium uppercase text-gray-800">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234 567890</li>
            <li>info@example.com</li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-300  " />
      <div className="flex items-center justify-center font-semibold py-5">
        <p>© {new Date().getFullYear()} Car Rental. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
