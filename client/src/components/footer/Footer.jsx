import { Link } from "react-router-dom";
import { assets, menuLinks } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

const Footer = () => {
  const { navigate } = useAppContext();

  return (
    <motion.footer
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-gray-500 px-6 sm:px-10 md:px-16 lg:px-20 text-sm bg-light"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto flex flex-col md:flex-row flex-wrap justify-between items-start gap-10 md:gap-8 py-10 md:py-4"
      >
        {/* Brand block */}
        <div className="w-full md:w-auto md:max-w-xs">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-9"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xs sm:max-w-80 mt-3"
          >
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
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
          </motion.div>
        </div>

        {/* Links block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full md:w-auto flex flex-wrap sm:flex-nowrap justify-between gap-8 md:gap-10 lg:gap-16 xl:w-1/2"
        >
          <div className="min-w-[45%] sm:min-w-0">
            <h2 className="text-base font-medium uppercase text-gray-800">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              {menuLinks.map((menu, i) => (
                <li
                  key={i}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="cursor-pointer hover:text-gray-800 transition"
                >
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[45%] sm:min-w-0">
            <h2 className="text-base font-medium uppercase text-gray-800">
              Resources
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Terms of Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-[45%] sm:min-w-0">
            <h2 className="text-base font-medium uppercase text-gray-800">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              <li>1234 Luxury Drive</li>
              <li>San Francisco, CA 94107</li>
              <li>+1 234 567890</li>
              <li className="break-all">info@example.com</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <hr className="border-gray-300" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center justify-center text-center font-semibold py-5 px-4 uppercase"
      >
        <p>© {new Date().getFullYear()} Car Rental App. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
