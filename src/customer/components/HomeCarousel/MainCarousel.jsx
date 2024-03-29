import { homeCarouselData } from "./MainCarouselData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainCarousel = () => {
   const settings = {
      dots: false,
      arrows: false,
      speed: 500,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
   };
   return (
      <Slider {...settings}>
         {homeCarouselData.map((item, index) => (
            <img
               key={index}
               className="cursor-pointer -z-10"
               role="presentation"
               src={item.image}
               alt=""
            />
         ))}
      </Slider>
   );
};

export default MainCarousel;
