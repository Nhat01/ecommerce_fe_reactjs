import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPayment, updatePayment } from "../../../State/Payment/Action";
import { getOrderById } from "../../../State/Order/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";
import { api } from "../../../config/apiConfig";
import axios from "axios";

const PaymentSuccess = () => {
   const [paymentId, setPaymentId] = useState();
   const [referenceId, setReferenceId] = useState();
   const [payerId, setPayerId] = useState();
   const { orderId } = useParams();

   const dispatch = useDispatch();
   const { order } = useSelector((store) => store.order);

   useEffect(() => {
      const urlParam = new URLSearchParams(window.location.search);

      setPaymentId(urlParam.get("paymentId"));
      setPayerId(urlParam.get("PayerID"));
   }, []);

   useEffect(() => {
      if (paymentId) {
         const data = { orderId, paymentId, payerId };
         dispatch(getOrderById(orderId));
         dispatch(updatePayment(data));
      }
   }, [orderId, paymentId]);

   console.log("order: ", order?.orderItems);

   return (
      <div className="px-2 lg:px-36 spac">
         <div className="flex flex-col justify-center items-center">
            <Alert
               variant="filled"
               severity="success"
               sx={{ mb: 6, width: "fit-content" }}
            >
               <AlertTitle>Payment Success</AlertTitle>
               Congratulate Your Order Get Placed
            </Alert>
         </div>
         <OrderTracker activeStep={1} />

         <Grid container className=" space-y-5 py-5 pt-20">
            {order?.orderItems?.map((item) => (
               <Grid
                  item
                  container
                  className="shadow-xl rounded-md p-5"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
               >
                  <Grid item xs={6} className="flex items-center">
                     <img
                        className="h-[5rem] w-[5rem] object-cover object-top"
                        src={item?.product.imageUrl}
                        alt=""
                     />
                     <div className="ml-5 space-y-2">
                        <p className="font-semibold">{item?.product?.title}</p>
                        <p className=" opacity-70">Size: {item?.size}</p>
                        <p className=" opacity-70 mt-2">
                           Seller: {item?.brand}
                        </p>
                        <div className="flex space-x-5 items-center text-gray-900 pt-6">
                           <p className="opacity-50 line-through">
                              ${item?.product?.price}
                           </p>
                        </div>
                     </div>
                  </Grid>
                  <Grid item>
                     <AddressCard address={order?.shippingAddress} />
                  </Grid>
               </Grid>
            ))}
         </Grid>
      </div>
   );
};

export default PaymentSuccess;
