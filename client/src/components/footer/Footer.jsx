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
      className="text-gray-500 px-6 md:px-16 lg:px-24 xl:px-32 text-sm bg-light"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto flex flex-wrap justify-between items-start gap-8 md:gap-8 p-6"
      >
        <div>
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
            className="max-w-80 mt-3"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between flex-wrap gap-8 w-1/2"
        >
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
        </motion.div>
      </motion.div>
      <hr className="border-gray-300" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center justify-center font-semibold py-5"
      >
        <p>© {new Date().getFullYear()} Car Rental. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
