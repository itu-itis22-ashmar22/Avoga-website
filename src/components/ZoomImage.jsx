import React, { useState, useRef, useEffect } from 'react';

const ZoomImage = ({ src, alt, className }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const zoomRef = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault(); // Prevent page scroll
        setIsZoomed(true);
        updateZoomPosition(e.touches[0].pageX, e.touches[0].pageY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault(); // Prevent page scroll
        updateZoomPosition(e.touches[0].pageX, e.touches[0].pageY);
      }
    };

    const handleTouchEnd = () => {
      setIsZoomed(false);
    };

    const imageElement = imageRef.current;
    imageElement.addEventListener('touchstart', handleTouchStart);
    imageElement.addEventListener('touchmove', handleTouchMove);
    imageElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      imageElement.removeEventListener('touchstart', handleTouchStart);
      imageElement.removeEventListener('touchmove', handleTouchMove);
      imageElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseMove = (e) => {
    if (isZoomed) {
      updateZoomPosition(e.pageX, e.pageY);
    }
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const updateZoomPosition = (pageX, pageY) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = pageX - left - window.pageXOffset;
    const y = pageY - top - window.pageYOffset;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    setZoomPosition({ x: xPercent, y: yPercent });
  };

  return (
    <section className="relative">
      <div className="relative group flex">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`w-full h-auto object-cover ${className}`}
          style={{ imageRendering: 'auto' }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        {isZoomed && (
          <div
            ref={zoomRef}
            className="fixed z-50 w-[600px] h-[550px] bg-white border border-gray-300 overflow-hidden pointer-events-none"
            style={{
              left: `${imageRef.current.getBoundingClientRect().right + 20}px`,
              top: `${imageRef.current.getBoundingClientRect().top}px`,
              backgroundImage: `url(${src})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '200%', // Adjust zoom level here
              imageRendering: 'high-quality',
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ZoomImage;
