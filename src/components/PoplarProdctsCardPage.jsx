import {star} from '../assets/icons';
import { useNavigate } from 'react-router-dom';
const PoplarProdctsCardPage = ({imgURL,rate,name,price}) => {
 
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${name}`);
  };
  return (  
    <section className=" cursor-pointer"
    onClick={handleClick}>
    <div className=" relative flex flex-1 flex-col 
    w-full max-sm:w-full group  
    rounded-lg 
    overflow-hidden group-hover:scale-105"> 
        {/* Added relative (This is added to the 
        main container div to position the image 
        and allow transformations.) 
        and group classes(This class is used to create 
        a group context, allowing group-hover
         utilities to be applied to child elements.) */}
<div>
       <img
           src={imgURL} alt={name}
           className=" w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[450px] md:h-[450px] object-cover  
            shadow-md transition-transform 
           duration-300 ease-in-out group-hover:scale-110 ml-1"
            //  Added transition and scale on hover 

             />
</div>
      <div className="mt-8 flex justify-start gap-2.5 ml-2 ">
        <img src={star} alt="rating"
             width={24} height={24}/>
              <p className="font-montserrat text-xl 
              leading-normal text-slate-gray " >{rate}</p>
      </div> 
      <h3 className="mt-3 text-2xl 
      leading-normal font-semibold font-palanquin ml-2">{name}</h3>
      <p className="mt-2 font-semibold 
      font-montserrat text-coral-red
       text-2xl leading-normal ml-2 ">{price}</p>
    </div>
    </section>

  )
}

export default PoplarProdctsCardPage