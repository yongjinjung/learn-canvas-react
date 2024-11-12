import './Header.css';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';
import Button from './Button';

export default function Header() {
  const navigate = useNavigate();
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, to: '/' },
    { id: 'about', label: 'About', icon: <FaInfoCircle />, to: '/about' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, to: '/contact' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className="bg-gray-800 text-white px-4"
      style={{ position: 'sticky', top: '0px', zIndex: 1 }}
    >
      <div className="container mx-auto flex justify-between h-14 items-center">
        <div>
          <Link to="/" className="text-xl font-bold">
            Lean Canvas
          </Link>
        </div>

        <nav className="space-x-4">
          {navItems.map(item => {
            return (
              <NavLink
                className="hover:text-gray-300"
                key={item.id}
                to={item.to}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars />
        </button>
        <Button className="hidden md:block">짐코딩 강의</Button>
      </div>
      {/*모바일 메뉴*/}
      <aside
        className={`
        fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 duration-500
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:hidden transform transition-transform ease-in-out
        `}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close Menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map(item => (
            <NavLink key={item.id} to={item.to} className="hover:text-gray-300">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}
