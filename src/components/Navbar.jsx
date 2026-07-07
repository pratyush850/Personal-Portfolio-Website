import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import profile from "../assets/profile.png";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Logo */}
          <div className="relative group flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 object-contain z-10"
            />
          {/* Hover Profile */}
          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-14
              w-36
              h-36
              opacity-0
              scale-75
              group-hover:opacity-100
              group-hover:scale-100
              transition-all
              duration-300
              pointer-events-none
              z-[999]
            "
          >
            <img
              src={profile}
              alt="Pratyush"
              className="
              w-full
              h-full
              rounded-full
              object-cover
              border-4
              border-[#915EFF]
              shadow-[0_0_25px_rgba(145,94,255,0.7)]
            "
          />
        </div>
      </div>

          <p className="text-white text-[18px] font-bold flex">
            Pratyush Das&nbsp;
            <span className="text-[#915EFF] sm:block hidden"> | Data Analyst</span>
          </p>
        </Link>

        {/* Desktop Menu */}
<div className="hidden sm:flex items-center gap-8">

  {/* Download CV Button */}
  <a
    href="https://drive.google.com/file/d/1GPRHzfWqhL_fEF12aOFvSrR9PsvHKt-A/view?usp=drive_link"
    target="_blank"
    rel="noopener noreferrer"
    className="
    ml-6
    inline-flex
    items-center
    justify-center
    px-6
    py-3
    rounded-full

    border
    border-[#915EFF]
    bg-[#151030]

    text-white
    font-semibold
    text-[15px]
    tracking-wide

    shadow-[0_0_12px_rgba(145,94,255,0.35)]

    transition-all
    duration-300
    ease-in-out

    
    hover:text-white
    hover:scale-110
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(145,94,255,0.8),0_0_60px_rgba(145,94,255,0.45)]

    active:scale-95
  "
  >
    Download CV
  </a>

  {/* Social Icons */}
  <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/pratyush-das-99963b247/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-7 h-7 hover:scale-110 transition-all duration-300"
              />
            </a>

            <a
              href="https://github.com/pratyush850"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={github}
                alt="GitHub"
                className="w-7 h-7 hover:scale-110 transition-all duration-300"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <ul className="list-none flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              <li>
                <a
                  href="https://www.linkedin.com/in/YOUR-LINKEDIN/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/YOUR-GITHUB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  GitHub
                </a>
              </li>

              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;