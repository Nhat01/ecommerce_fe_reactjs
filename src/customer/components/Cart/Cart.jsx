import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, IconButton, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import { createPayment } from "../../../State/Payment/Action";

const Cart = ({ orderId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleCheckoutClick = () => {
      if (orderId) {
         console.log(orderId);
         dispatch(createPayment(orderId));
      } else {
         navigate("/checkout?step=1");
      }
   };
   const { cart, updateCart, deleteCart } = useSelector((store) => store.cart);

   useEffect(() => {
      dispatch(getCart());
   }, [updateCart, deleteCart]);
   return (
      <div className=" mt-10">
         <div className="lg:grid grid-cols-12 lg:px-16 relative">
            <div className="col-span-7">
               {cart?.cartItems?.map((item) => (
                  <CartItem cartItem={item} key={item.id} />
               ))}
            </div>
            <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 col-span-5 ">
               <div className="border bg-[#f9fafb] rounded-md p-4">
                  <p className=" font-medium pb-4 text-[#111827] text-lg">
                     Price Details
                  </p>
                  <div className=" space-y-3 font-normal mb-4">
                     <div className="flex justify-between pt-3 text-black">
                        <span className="text-sm text-gray-600">Price</span>
                        <span>${cart?.totalPrice}</span>
                     </div>
                     <hr />
                     <div className="flex justify-between pt-3">
                        <span className="text-sm text-gray-600">Discount</span>
                        <span className="text-green-600">
                           -${cart?.discount}
                        </span>
                     </div>
                     <hr />
                     <div className="flex justify-between pt-3">
                        <span className="text-sm text-gray-600">
                           Delivery Charge
                        </span>
                        <span className=" text-green-600">Free</span>
                     </div>
                     <hr />
                     <div className="flex justify-between pt-3 font-bold">
                        <span className=" font-medium text-[#111827] text-lg">
                           Total Amount
                        </span>
                        <span className="text-green-600">
                           ${cart?.totalDiscountedPrice}
                        </span>
                     </div>
                  </div>
                  <Button
                     onClick={handleCheckoutClick}
                     variant="contained"
                     className="w-full"
                     sx={{
                        px: "2.5rem",
                        py: ".7rem",
                        bgcolor: "#9155fd",
                     }}
                  >
                     Checkout
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;
