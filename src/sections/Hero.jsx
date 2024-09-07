import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import { arrowRight } from '../assets/icons';
import { statistics } from '../constants';
import { bigShoe1 } from "../assets/images";
import { PopSound } from '../assets/music';
import './Styles.css';
import './bubbles.css';

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);
  const headingRef = useRef(null);
  const bubbleContainerRef = useRef(null);
  const audioContextRef = useRef(null);
  const bubbleCountRef = useRef(0);
  const bufferRef = useRef(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    fetch(PopSound)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        bufferRef.current = audioBuffer;
      })
      .catch(error => console.error('Error loading sound:', error));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = Math.min(scrollY / 10, 90);
      if (headingRef.current) {
        headingRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScroll);
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      },
      {
        threshold: [0, 1],
      }
    );

    observer.observe(headingRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      audioContext.close();
    };
  }, []);

  useEffect(() => {
    const getRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r},${g},${b},0.5)`;
    };

    const createBubble = () => {
      if (bubbleCountRef.current >= 6) return;

      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.width = `${Math.random() * 100 + 50}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.backgroundColor = getRandomColor();
      bubbleContainerRef.current.appendChild(bubble);
      bubbleCountRef.current += 1;

      bubble.addEventListener('click', () => {
        bubble.style.transform = 'scale(0)';
        if (bufferRef.current && audioContextRef.current) {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = bufferRef.current;
          source.connect(audioContextRef.current.destination);
          source.start(0, 0.5);
        }
        setTimeout(() => {
          bubble.remove();
          bubbleCountRef.current -= 1;
        }, 200);
      });
    };

    const bubbleInterval = setInterval(createBubble, 3000);

    return () => clearInterval(bubbleInterval);
  }, []);

  return (
    <section 
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container relative">
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-coral-red non-selectable">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>  Our Summer Collection 
        </p>
        
        <div ref={headingRef} className="relative z-10 inline-block mt-10 mr-16 rotating-heading non-selectable text-container">
          <h1 className="font-palanquin text-[70px] max-sm:text-[72px] max-sm:leading[82px] font-bold non-selectable">
            <span className="xl:whitespace-nowrap non-selectable">The New Arrival</span>
            <br />
            <span className="text-coral-red non-selectable">AVOGA</span> Clothes
          </h1>
        </div> 

        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Discover styling Avoga arrivals, quality comfort, and innovation for your active life.
        </p>

        <Button label="Shop now" iconURL={arrowRight} />

        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div
  className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-hero bg-fixed bg-hero-custom parallax-background"
>
  <img 
    src={bigShoeImg}
    alt="shoe collection"
    width={0}
    height={0}
    className="object-contain relative z-10 opacity-0"
  />
</div> 

      
      <div ref={bubbleContainerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden"></div>
    </section>
  );
};

export default Hero;
