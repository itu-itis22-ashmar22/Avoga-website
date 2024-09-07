import React, { useEffect } from 'react';
import NavPage from '../components/NavPage';
import { PageProducts } from '../pages';
import PoplarProdctsCardPage from '../components/PoplarProdctsCardPage';

const ProductsPage = () => {
  useEffect(() => {
    // Preload images
    const preloadImages = (images) => {
      images.forEach((image) => {
        if (image) {
          const img = new Image();
          img.src = image;
        }
      });
    };

    PageProducts.forEach((product) => {
      preloadImages([product.imgURL, ...product.additionalPhotos || []]);

      if (product.colors) {
        Object.values(product.colors).forEach((color) => {
          preloadImages([color.mainImage, ...color.additionalPhotos || []]);
        });
      }
    });
  }, []);

  return (
    <div className="mb-16">
      {/* Changed to mb-16 for larger bottom margin */}

      {/* Include the Nav component for the navigation bar */}
      <NavPage />

      {/* Main content section for products */}
      <section id="products" className="max-container max-sm:mt-12 pt-40">
        {/* Added pt-40 for padding top */}
        <div className="flex flex-col justify-start gap-5">
          <h2 className="text-4xl font-palanquin font-bold ml-4">
            Our <span className="text-coral-red">New</span> Collection
          </h2>
        </div>
        <div className="mt-12 grid lg:grid-cols-4 md:grid-cols-3 
          sm:grid-cols-2 grid-cols-1 sm:gap-7 gap-14 ml-4">
          {/* Added ml-4 for margin-left */}
          {PageProducts.map((product) => (
            <PoplarProdctsCardPage key={product.name} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
