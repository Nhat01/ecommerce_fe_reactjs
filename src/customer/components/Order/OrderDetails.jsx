import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
   return (
      <div className="lg:px-20 px-5 pt-10">
         <div className="border p-5">
            <h1 className="font-semibold text-xl py-5">Delivery Address</h1>
            <AddressCard />
         </div>
         <div className="py-20">
            <OrderTracker activeStep={3} />
         </div>
         <Grid container className="space-y-5">
            {[1, 1, 1, 1, 1].map((item) => (
               <Grid
                  item
                  container
                  className="shadow-xl rounded-md p-5 border"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
               >
                  <Grid item xs={6}>
                     <div className="flex items-center space-x-4">
                        <img
                           className="w-[5rem] h-[5rem] object-cover object-top"
                           src=""
                           alt=""
                        />
                        <div className="space-y-2 ml-5">
                           <p className="font-semibold">Men Slim Mid Rise</p>
                           <p className="font-semibold space-x-5 opacity-50 text-xs">
                              <span className="space-y-5">Color: pink</span>
                              <span>Size: M</span>
                           </p>
                           <p>Seller: nhacst</p>
                           <p>$1099</p>
                        </div>
                     </div>
                  </Grid>
                  <Grid item>
                     <Box sx={{ color: deepPurple[500] }}>
                        <StarIcon sx={{ fontSize: "2rem" }} className="px-2" />
                        <span>Rate & Review Product</span>
                     </Box>
                  </Grid>
               </Grid>
            ))}
         </Grid>
      </div>
   );
};

export default OrderDetails;
