import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
   const navigate = useNavigate();
   return (
      <div
         onClick={() => navigate(`/account/order/${item._id}`)}
         className="p-5 shadow-md shadow-black hover:shadow-2xl border"
      >
         <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item xs={6}>
               <div className="flex cursor-pointer">
                  <img
                     className="w-[5rem] h-[5rem] object-cover object-top"
                     src={item.orderItems[0].product.imageUrl}
                     alt=""
                  />
                  <div className="ml-5 space-y-2">
                     <p className="">{item.orderItems[0].product.title}</p>
                     <p className=" opacity-50 text-xs font-semibold">
                        Size: {item.orderItems[0].size}
                     </p>
                  </div>
               </div>
            </Grid>
            <Grid item xs={2}>
               <p>${item.orderItems[0].discountedPrice}</p>
            </Grid>
            <Grid item xs={4}>
               {true && (
                  <div>
                     <p>
                        <AdjustIcon
                           sx={{ width: "15px", height: "15px" }}
                           className=" text-green-600 mr-2 text-sm"
                        />
                        <span>Delivered On March 03</span>
                     </p>
                     <p className=" text-xs">Your Item Has Been Delivered</p>
                  </div>
               )}
               {false && (
                  <p>
                     <span>Expected Delivery On March 03</span>
                  </p>
               )}
            </Grid>
         </Grid>
      </div>
   );
};

export default OrderCard;
