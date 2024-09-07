import React from 'react'; 
import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants';


// Component with conditional CSS import
const NavPage = () => {
 

  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img 
            src={headerLogo}
            alt="logo"
            width={300}
            height={30}
          />
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {
            navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="font-montserrat 
                leading-normal text-lg text-black bg-black 
                bg-opacity-30 px-4 py-2 rounded-full shadow-md 
                backdrop-blur-sm  transition-all 
                duration-300 hover:bg-opacity-50">
                  {item.label}
                </a>
              </li>
            ))
          }
        </ul>
        <div className="hidden max-lg:block">
          <img 
            src={hamburger} 
            alt="hamburger"
            width={25}
            height={25}
          />
        </div>
      </nav>
    </header>
  )
}

export default NavPage;
