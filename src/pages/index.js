import {
   shirt1, shirt2, shirt3, shirt4,
   greyshirt1, greyshirt2,
   shirt1Additional1, shirt1Additional2, shirt1Additional3,
 } from "../assets/images";
 
 export const PageProducts = [
   { 
     imgURL: shirt1,
     rate: "4.3",
     name: "T-shirt",
     price: "20$",
     additionalPhotos: [shirt1Additional1, shirt1Additional2, shirt1Additional3],
     colors: {
      white: {
         hex: '#FFFFF7',
         mainImage: greyshirt2,
         additionalPhotos: [greyshirt2, greyshirt1],
       },
       // Add more colors as needed
     },
     sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
   },
   { 
     imgURL: shirt2,
     rate: "4.5",
     name: "T-shirt why",
     price: "15$",
     additionalPhotos: [/* additional photos */],
     sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
   },
   { 
     imgURL: shirt3,
     rate: "4.7",
     name: "T-shirt super",
     price: "15$",
     additionalPhotos: [/* additional photos */],
     sizes: ['M', 'L', 'XL']
   },
   { 
     imgURL: shirt4,
     rate: "4.8",
     name: "T-shirt open",
     price: "15$",
     additionalPhotos: [/* additional photos */],
     sizes: ['XS', 'S', 'M']
   },
   // Add more products as needed
 ];
 