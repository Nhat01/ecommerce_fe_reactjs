import React, { useEffect } from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/men_kurta";
import { useDispatch, useSelector } from "react-redux";
import { findProductCategories } from "../../../State/Product/Action";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage = () => {
   const dispatch = useDispatch();
   const { products, loading } = useSelector((store) => {
      return store.products;
   });

   useEffect(() => {
      const data = {
         categories: "mens_kurta,shirt",
         numberOfProducts: 10,
      };
      dispatch(findProductCategories(data));
   }, []);
   const settings = {
      dots: false,
      speed: 500,
      infinite: false,
      slidesToShow: 4.5,
      slidesToScroll: 2,
      draggable: false,
   };
   return (
      <div>
         <MainCarousel />
         <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
            {!loading && Array.isArray(products)
               ? products?.map((category) => (
                    <HomeSectionCarousel
                       data={category.products}
                       sectionName={"Men's Kurta"}
                       key={category.name}
                    />
                 ))
               : [1, 1].map(() => (
                    <div className="border">
                       <div className="h2 text-2xl font-extrabold text-gray-800 py-5">
                          <Skeleton width={150} />
                       </div>
                       <div className="p-5 relative">
                          <Slider {...settings} className="!select-auto ">
                             {[1, 1, 1, 1, 1].map(() => (
                                <div
                                   className={`cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden !w-lg-[15rem] !w-[15rem] mx-3 my-3 border hover:shadow-box-hover`}
                                >
                                   <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                      <div className="h-[12rem] w-[8rem]">
                                         <Skeleton height={180} />
                                      </div>
                                   </div>
                                   <div className="p-4 w-full">
                                      <h3 className="text-xs font-medium">
                                         <Skeleton />
                                      </h3>
                                      <p className="mt-2 text-sm">
                                         <Skeleton />
                                      </p>
                                      <div className="mt-2">
                                         <span className=" text-sm">
                                            <Skeleton />
                                         </span>
                                      </div>
                                      <div className="mt-2">
                                         <Skeleton />
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </Slider>
                       </div>
                    </div>
                 ))}
         </div>
      </div>
   );
};

export default HomePage;
