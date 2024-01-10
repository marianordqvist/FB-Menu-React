import "./index.css";
import { FaPlus, FaBell, FaCog, FaHtml5, FaReact } from "react-icons/fa";
import { BiMessageRoundedDetail, BiSolidFileCss } from "react-icons/bi";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropleftCircle,
  IoLogoJavascript,
} from "react-icons/io";
import { FaFaceMehBlank } from "react-icons/fa6";
import { SiTailwindcss } from "react-icons/si";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function App() {
  return (
    <Navbar>
      <NavItem icon={<FaPlus className="fix-size" />} />
      <NavItem icon={<FaBell className="fix-size" />} />
      <NavItem icon={<BiMessageRoundedDetail className="fix-size" />} />

      <NavItem icon={<IoIosArrowDropdownCircle className="fix-size" />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<FaCog className="fix-size" />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<IoIosArrowDropleftCircle />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<FaHtml5 />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BiSolidFileCss />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<IoLogoJavascript />}>
            JavaScript
          </DropdownItem>
          <DropdownItem leftIcon={<FaReact />}>React JS</DropdownItem>
          <DropdownItem leftIcon={<SiTailwindcss />}>Tailwind CSS</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
