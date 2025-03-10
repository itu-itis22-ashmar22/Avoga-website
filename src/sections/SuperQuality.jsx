import Button from "../components/Button"
import { video1 } from "../assets/images"
const SuperQuality = () => {
  return (
    <section 
    
    id="about"
    className="flex justify between items-center
     max-lg:flex-col gap-10 w-full max-container">
       
        <div className="flex flex-1 flex-col">

  <h2 className=" font-palanquin text-4xl capitalize font-bold lg:max-w-lg" >
   We provide you
  <span 
  className="text-coral-red"> Super
 </span> 
  <span 
  className="text-coral-red"> Quality</span> clothes
</h2> 

 <p className=" mt-4 lg:max-w-lg info-text">Ensuring premium comfort and style, our meticulously crafted footwear is designed to elevate your experience, providing you with unmatched quality, innovation, and a touch of elegance..</p>
 <p className="mt-6 lg:max-w-lg info-text">Our dedication to detail 
  and excellence ensures your satisfaction</p>

  <div className="mt-11 ">
<Button label="View detials"/>

  </div>
   </div>
          <div className="flex-1 flex justify-center items-center">  
           <video 
             src={video1}
             alt="video"
             width={570} height={100}
             className="object-contain"
             autoPlay
             muted
             loop
             />


          </div>
    </section>
  )
} 

export default SuperQuality