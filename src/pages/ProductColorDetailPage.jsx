import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PageProducts } from '../pages';
import ZoomImage from '../components/ZoomImage';
import ColorSelector from '../components/ColorSelector';
import SizeSelector from '../components/SizeSelector';
import NavPage from '../components/NavPage';

const ProductColorDetailPage = () => {
  const { productName, colorName } = useParams();
  const location = useLocation();
  const product = PageProducts.find(p => p.name === productName);
  const colorDetails = product?.colors?.[colorName];
  const [mainImage, setMainImage] = useState(colorDetails?.mainImage);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(localStorage.getItem('selectedSize') || null);
  const [customLocation, setCustomLocation] = useState('');

  useEffect(() => {
    if (colorDetails) {
      setMainImage(colorDetails.mainImage);
    }
  }, [location.pathname, colorDetails]);

  const handleThumbnailClick = (photo, index) => {
    if (selectedThumbnail === index) {
      setMainImage(colorDetails.mainImage);
      setSelectedThumbnail(null);
    } else {
      setMainImage(photo);
      setSelectedThumbnail(index);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    localStorage.setItem('selectedSize', size);
  };

  const handleBuyNowClick = () => {
    let message = `I would like to purchase the ${product.name}`;
    if (colorName) {
      message += ` in ${colorName}`;
    }
    if (selectedSize) {
      message += `, size ${selectedSize}`;
    }
    if (customLocation) {
      message += `, My location: ${customLocation}`;
    }

    const whatsappLink = `https://wa.me/905527879969?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappLink;
  };

  if (!product || (colorName && !colorDetails)) {
    return <div>Product or color not found</div>;
  }

  return (
    <div>
      <NavPage />
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 pt-40">
        <div className="flex md:flex-row items-start gap-4">
          <div className="flex flex-col gap-4">
            {colorDetails.additionalPhotos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${product.name} ${colorName} photo ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${selectedThumbnail === index ? 'border-2 border-coral-red' : ''}`}
                onClick={() => handleThumbnailClick(photo, index)}
                style={{ imageRendering: 'auto' }}
              />
            ))}
          </div>
          <div className="flex-1">
            <ZoomImage
              src={mainImage}
              alt={`${product.name} ${colorName}`}
              className="w-[400px] h-[400px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-cover rounded-lg"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl text-coral-red">{product.price}</p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Available Colors:</h2>
            <div className="flex gap-2 mt-2">
              {product.colors ? (
                <ColorSelector productName={product.name} colors={product.colors} />
              ) : (
                <p>No colors available for this product.</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <SizeSelector sizes={product.sizes || []} selectedSize={selectedSize} onSizeSelect={handleSizeSelect} />
          </div>
          <div className="mt-6">
            <label className="block text-lg font-medium mb-2" htmlFor="customLocation">Enter your location:</label>
            <input
              type="text"
              id="customLocation"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 123 Main St, Springfield, USA"
            />
          </div>
          <button
            className={`mt-8 px-6 py-2 rounded-lg ${selectedSize ? 'bg-coral-red text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!selectedSize}
            onClick={handleBuyNowClick}
            style={{ userSelect: 'none' }} // Make text unselectable
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductColorDetailPage;
