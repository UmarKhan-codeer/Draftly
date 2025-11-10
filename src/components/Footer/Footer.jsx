import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Container } from "../index";

export default function Footer() {
  return (
     <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <Container>
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
          {/* Left Section - Logo and Links */}
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-2 group">
              <img
                src="/Logo.svg"
                alt="Draftly"
                className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
              {["About", "Blog", "Privacy", "Terms", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex space-x-3">
            {[
              { Icon: FaInstagram, name: "Instagram" },
              { Icon: FaTwitter, name: "Twitter" },
              { Icon: FaFacebook, name: "Facebook" },
            ].map(({ Icon, name }) => (
              <a
                key={name}
                href="#"
                title={name}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80  border border-slate-200 dark:border-slate-700 text-gray-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 pb-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-emerald-500">
            Draftly
          </span>
          . Crafted with 💚 for sharing stories.
        </div>
      </Container>
    </footer>
  );
}
