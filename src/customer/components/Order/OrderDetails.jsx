import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../State/Order/Action";

const OrderDetails = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const { order } = useSelector((store) => store.order);
   const { user } = useSelector((store) => store.auth);

   useEffect(() => {
      if (user) {
         dispatch(getOrderById(params.orderId));
      }
   }, []);
   console.log("order: ", order);
   return (
      <div className="lg:px-20 px-5 pt-10">
         <div className="border p-5">
            <h1 className="font-semibold text-xl py-5">Delivery Address</h1>
            <AddressCard address={order?.shippingAddress} />
         </div>
         <div className="py-20">
            <OrderTracker activeStep={3} />
         </div>
         <Grid container className="space-y-5">
            {order?.orderItems.map((item) => (
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
                           src={item.product.imageUrl}
                           alt=""
                        />
                        <div className="space-y-2 ml-5">
                           <p className="font-semibold">{item.product.title}</p>
                           <p>Seller: {item.product.brand}</p>
                           <p className="font-semibold space-x-5 opacity-50 text-xs">
                              <span>Size: {item.size}</span>
                              <span>Quantity: {item.quantity}</span>
                           </p>
                           <p>Price: ${item.product.discountedPrice}</p>
                           <p>Total: ${item.discountedPrice}</p>
                        </div>
                     </div>
                  </Grid>
                  {order.orderStatus === "DELIVERED" && (
                     <Grid item>
                        <Box sx={{ color: deepPurple[500] }}>
                           <StarIcon
                              sx={{ fontSize: "2rem" }}
                              className="px-2"
                           />
                           <span>Rate & Review Product</span>
                        </Box>
                     </Grid>
                  )}
               </Grid>
            ))}
         </Grid>
      </div>
   );
};

export default OrderDetails;
