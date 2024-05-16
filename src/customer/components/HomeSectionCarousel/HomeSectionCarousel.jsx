import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSectionCarousel({ data, sectionName }) {
   const [currentSlide, setCurrentSlide] = useState(0);
   const sliderRef = useRef(null);

   const slidePrev = () => {
      sliderRef.current.slickPrev();
   };
   const slideNext = () => {
      sliderRef.current.slickNext();
   };
   const settings = {
      dots: false,
      speed: 500,
      infinite: false,
      slidesToShow: 4.5,
      slidesToScroll: 2,
      draggable: false,
      beforeChange: (oldIndex, newIndex) => {
         setCurrentSlide(newIndex);
      },
   };
   return (
      <div className="border">
         <div className="h2 text-2xl font-extrabold text-gray-800 py-5">
            {sectionName}
         </div>
         <div className="relative p-5">
            <Slider ref={sliderRef} {...settings} className="!select-auto ">
               {data?.map((item, index) => {
                  return (
                     <HomeSectionCard
                        product={item}
                        key={index}
                        className="hover:shadow-box-hover-card"
                     />
                  );
               })}
            </Slider>
            {currentSlide < data?.length - settings.slidesToShow && (
               <Button
                  className="z-40 bg-white"
                  onClick={slideNext}
                  variant="contained"
                  sx={{
                     position: "absolute",
                     top: "8rem",
                     right: "0rem",
                     transform: "translateX(50%) rotate(90deg)",
                     bgcolor: "white",
                  }}
                  aria-label="next"
               >
                  <KeyboardArrowLeftIcon
                     sx={{ transform: "rotate(90deg)", color: "black" }}
                  />
               </Button>
            )}
            {currentSlide !== 0 && (
               <Button
                  className="z-50 bg-white"
                  onClick={slidePrev}
                  variant="contained"
                  sx={{
                     position: "absolute",
                     top: "8rem",
                     left: "0rem",
                     transform: "translateX(-50%) rotate(-90deg)",
                     bgcolor: "white",
                  }}
                  aria-label="prev"
               >
                  <KeyboardArrowLeftIcon
                     sx={{ transform: "rotate(90deg)", color: "black" }}
                  />
               </Button>
            )}
         </div>
      </div>
   );
}

export default HomeSectionCarousel;
