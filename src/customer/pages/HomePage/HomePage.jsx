import React, { useEffect } from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/men_kurta";
import { useDispatch, useSelector } from "react-redux";
import { findProductCategories } from "../../../State/Product/Action";

const HomePage = () => {
   const dispatch = useDispatch();
   const { products } = useSelector((store) => {
      return store.products;
   });

   useEffect(() => {
      const data = {
         categories: "mens_kurta,women_jeans,shirt,women_dress",
         numberOfProducts: 10,
      };
      dispatch(findProductCategories(data));
   }, []);
   console.log("product: ", products);
   return (
      <div>
         <MainCarousel />
         <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
            {/* <HomeSectionCarousel
               data={mens_kurta}
               sectionName={"Men's Kurta"}
            />
            <HomeSectionCarousel
               data={mens_kurta}
               sectionName={"Men's Shoes"}
            />
            <HomeSectionCarousel
               data={mens_kurta}
               sectionName={"Men's Shirt"}
            />
            <HomeSectionCarousel
               data={mens_kurta}
               sectionName={"Women's Saree"}
            />
            <HomeSectionCarousel
               data={mens_kurta}
               sectionName={"Women's Dress"}
            /> */}
            {products?.map((category) => (
               <HomeSectionCarousel
                  data={category.products}
                  sectionName={"Men's Kurta"}
                  key={category.name}
               />
            ))}
         </div>
      </div>
   );
};

export default HomePage;
