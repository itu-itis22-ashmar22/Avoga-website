import React, { useEffect, useRef } from "react";
import { copyrightSign } from "../assets/icons";
import { footerLogo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";
import { PopSound } from "../assets/music"; // Import the pop sound
import './bubbles.css'; // Import the bubbles CSS file

const Footer = () => {
  const bubbleContainerRef = useRef(null);
  const audioContextRef = useRef(null); // Create a ref for the AudioContext
  const bubbleCountRef = useRef(0); // Track the number of bubbles
  const bufferRef = useRef(null); // Create a ref for the audio buffer

  useEffect(() => {
    // Initialize the AudioContext and load the sound buffer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    fetch(PopSound)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        bufferRef.current = audioBuffer;
      })
      .catch(error => console.error('Error loading sound:', error));

    const getRandomColor = () => {
      return `rgba(255, 255, 255, 0.8)`; // White bubbles with some transparency
    };

    const createBubble = () => {
      if (bubbleCountRef.current >= 8) return; // Limit to max 10 bubbles

      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.width = `${Math.random() * 100 + 50}px`; // Larger bubbles
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.backgroundColor = getRandomColor();
      bubbleContainerRef.current.appendChild(bubble);
      bubbleCountRef.current += 1; // Increment bubble count

      bubble.addEventListener('click', () => {
        bubble.style.transform = 'scale(0)';
        if (bufferRef.current && audioContextRef.current) {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = bufferRef.current;
          source.connect(audioContextRef.current.destination);
          source.start(0, 0.5); // Start playback at 0.5 seconds to skip the delay
        }
        setTimeout(() => {
          bubble.remove();
          bubbleCountRef.current -= 1; // Decrement bubble count
        }, 200);
      });
    };

    const bubbleInterval = setInterval(createBubble, 3000); // Adjusted interval for less frequent bubbles

    return () => clearInterval(bubbleInterval);
  }, []);

  return (
    <footer className="max-container relative">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/">
            {/* <img  
              src={footerLogo}
              width={150}
              height={46}
            /> */}
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            Get clothes ready for the new term at your online Avoga store. 
            Find Your perfect Match.
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon) => (
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full">
                <img 
                  src={icon.src}
                  alt={icon.alt}
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-montserrat text-2xl leading-normal font-medium mb-6">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li className="mt-3 text-white-400 font-montserrat text-base leading-normal hover:text-slate-gray cursor-pointer" key={link.name}>
                    <a>{link.name}</a>  
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>   
      <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
        <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
          <img 
            src={copyrightSign}
            alt="copy right sign"
            width={20}
            height={20}
            className="rounded-full m-0"
          />
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className="font-montserrat cursor-pointer">Terms & Conditions</p>
      </div>
      <div ref={bubbleContainerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden"></div>
    </footer>
  );
}

export default Footer;
