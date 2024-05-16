import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product, className }) => {
   const navigate = useNavigate();

   return (
      <div
         onClick={() => navigate(`/product/${product._id}`)}
         className={`cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-lg-[15rem] w-[15rem] mx-3 my-3 border hover:shadow-box-hover ${className}`}
      >
         <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="h-[12rem] w-[8rem]">
               <img
                  className=" object-cover object-top w-full h-full"
                  src={product.imageUrl}
                  alt=""
               />
            </div>
         </div>
         <div className="p-4 w-full">
            <h3 className="text-xs font-medium text-gray-900">
               {product.brand}
            </h3>
            <p className="mt-2 text-sm text-gray-500 truncate">
               {product.title}
            </p>
            <div className="mt-2">
               <span className=" text-sm text-red-600">
                  ${product.discountedPrice}
               </span>
               <span className="ml-4 text-sm text-gray-500 line-through">
                  ${product.price}
               </span>
            </div>
            <div className="mt-2 flex items-center">
               <Rating
                  value={4.5}
                  size="small"
                  name="half-rating"
                  readOnly
                  precision={0.5}
               />
               <span className="ml-4 text-sm text-gray-500">({"10"})</span>
            </div>
         </div>
      </div>
   );
};

export default HomeSectionCard;
