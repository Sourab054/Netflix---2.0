import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="py-6 px-4 md:flex md:items-center md:justify-between">
          <div className="flex mt-4 space-x-6 mb-0 sm:justify-center md:mt-0">
            <FaFacebookF size={22} />
            <FaInstagram size={22} />
            <FaTwitter size={22} />
            <FaYoutube size={22} />
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-8 py-8 px-6 md:grid-cols-4">
          <div>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  Audio Description
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Legal Notices
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Help center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Jobs
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Gift Cards
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Media Information
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-sm text-center text-gray-300 bg-gray-800 font-semibold py-1 bg-gray sm:text-center">
        Made with ❤️ by Sourab Patil
      </div>
    </footer>
  );
};

export default Footer;
