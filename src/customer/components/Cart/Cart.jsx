import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button, IconButton, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeItemToCart } from "../../../State/Cart/Action";
import {
   createPayment,
   createPaymentVnPay,
} from "../../../State/Payment/Action";
import Skeleton from "react-loading-skeleton";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";

const Cart = ({ orderId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   let [isOpen, setIsOpen] = useState(false);
   let [cartItemId, setCartItemId] = useState(null);
   const { cart, loading, deleteCart, updateCart } = useSelector(
      (store) => store.cart
   );

   function closeModal() {
      setIsOpen(false);
   }

   function clickConfirmDelete() {
      setIsOpen(false);
      dispatch(removeItemToCart(cartItemId));
   }

   function openModal() {
      setIsOpen(true);
   }

   const handleCheckoutClick = () => {
      if (orderId) {
         dispatch(createPayment(orderId));
      } else {
         navigate("/checkout?step=1");
      }
   };

   const handleCheckoutVnPayClick = () => {
      if (orderId) {
         dispatch(createPaymentVnPay(orderId));
      } else {
         navigate("/checkout?step=1");
      }
   };

   const handleCashOnDeliveryClick = () => {};
   const { user } = useSelector((store) => store.auth);

   useEffect(() => {
      if (user) {
         dispatch(getCart());
      }
   }, [deleteCart, updateCart]);

   return !loading ? (
      cart?.cartItems?.length > 0 ? (
         <>
            <div className=" mt-10">
               <div className="lg:grid grid-cols-12 lg:px-16 relative">
                  <div className="col-span-7">
                     {cart?.cartItems?.map((item) => (
                        <CartItem
                           cartItem={item}
                           key={item._id}
                           setCartItemId={setCartItemId}
                           openModal={openModal}
                        />
                     ))}
                  </div>
                  <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 col-span-5 ">
                     <div className="border bg-[#f9fafb] rounded-md p-4">
                        <p className=" font-medium pb-4 text-[#111827] text-lg">
                           Price Details
                        </p>
                        <div className=" space-y-3 font-normal mb-4">
                           <div className="flex justify-between pt-3 text-black">
                              <span className="text-sm text-gray-600">
                                 Price
                              </span>
                              <span>${cart?.totalPrice}</span>
                           </div>
                           <hr />
                           <div className="flex justify-between pt-3">
                              <span className="text-sm text-gray-600">
                                 Discount
                              </span>
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
                        {orderId ? (
                           <>
                              <Button
                                 onClick={handleCashOnDeliveryClick}
                                 variant="contained"
                                 className="w-full"
                                 sx={{
                                    px: "2.5rem",
                                    py: ".7rem",
                                    bgcolor: "#9155fd",
                                    marginBottom: "1.5rem",
                                 }}
                              >
                                 Cash On Delivery
                              </Button>
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
                                 <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAApVBMVEX////h5vC2wdm4w9rI0ePo7fUqRZAAB3oAEnxCWZv19/oAI4MALYUAL4YAJoMAAHnb4OwAK4Q4UJYAFHwAMIeSn8IAHoAAKXsBJHENLoFfcagBIGkAKXJvvegOOo0AGWQBVpcAl92j1fEBAFsDjtEAmd1Vs+UBEGAAn+EBB1wES40AnN4AHm0DOX0EfL2t2vIEYqUHVKHn9vwGbLPT6/h7irYnpOHqpTq5AAAA30lEQVR4Ab3QRQKDQBBE0YlbD3FX3F3uf7Q07svkL3lIMeTHDYZpo/GkjdPZPG02W4wbtlwBzWPWDd3Madl2V8fhviA4wLb+3eMJL58vaefrsoY3htLD5Z71eNbwtcUnc3t/WK6KM1pBXhCl6tg12jkz+aPUcDTHT2aoaoouPhtjD4aMvU1L0XXWbozdOpZlCaKCpivLCu62FEDBYmk8uDwAhVcCoiiyNSObE9Ctm6AkPTmPVBvhyTI+Yv3n87EAq2Rl0MbwtN2uBB3z2ricYApaRLrzWNwp9eETC8gf+gLSxB5s5mkQCwAAAABJRU5ErkJggg=="
                                    alt=""
                                    className="w-[1.5rem] h-[1.5rem] rounded-full mr-2"
                                 />
                                 Checkout with paypal
                              </Button>
                              <Button
                                 onClick={handleCheckoutVnPayClick}
                                 variant="contained"
                                 className="w-full"
                                 sx={{
                                    px: "2.5rem",
                                    py: ".7rem",
                                    bgcolor: "#9155fd",
                                    mt: "2rem",
                                 }}
                              >
                                 Checkout with VNPAY
                              </Button>
                           </>
                        ) : (
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
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
               <Dialog
                  as="div"
                  className="relative z-[50]"
                  onClose={closeModal}
               >
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0">
                     <div className="flex min-h-full items-start mt-14 justify-center p-4 text-center">
                        <Transition.Child
                           as={Fragment}
                           enter="ease-out duration-300"
                           enterFrom="opacity-0 scale-95"
                           enterTo="opacity-100 scale-100"
                           leave="ease-in duration-200"
                           leaveFrom="opacity-100 scale-100"
                           leaveTo="opacity-0 scale-95"
                        >
                           <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <div className="flex items-center justify-between">
                                 <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                 >
                                    Confirm delete item
                                 </Dialog.Title>
                                 <CloseIcon
                                    sx={{ fontSize: "20px" }}
                                    className="text-gray-400 hover:text-gray-500 cursor-pointer"
                                    onClick={closeModal}
                                 />
                              </div>
                              <div className="mt-2">
                                 <p className="text-sm text-gray-500">
                                    Are you sure you want to remove this item
                                    from your cart?
                                 </p>
                              </div>

                              <div className="mt-4 flex justify-end">
                                 <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    onClick={closeModal} // Cancelling the action
                                 >
                                    Cancel
                                 </button>
                                 <button
                                    type="button"
                                    className="inline-flex ml-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={clickConfirmDelete} // Confirming the action
                                 >
                                    Confirm
                                 </button>
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </>
      ) : (
         <div className="h-80 w-full flex items-center flex-col justify-center">
            <img src="/empty_cart.gif" alt="empty_cart" />
            <p>No Item In Cart</p>
         </div>
      )
   ) : (
      <div className=" mt-10">
         <div className="lg:grid grid-cols-12 lg:px-16 relative">
            <div className="col-span-7">
               {[1, 1].map((item) => (
                  <div className="p-5 shadow-lg border rounded-md  mb-10">
                     <div className="flex items-center relative">
                        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                           <Skeleton height={130} />
                        </div>

                        <div className="ml-5 space-y-1">
                           <p className="font-semibold">
                              <Skeleton />
                           </p>
                           <p className=" opacity-70">
                              <Skeleton />
                           </p>
                           <p className=" opacity-70 mt-2">
                              <Skeleton />
                           </p>
                           <div className="flex space-x-5 items-center text-gray-900 pt-6">
                              <Skeleton width={200} />
                           </div>
                        </div>
                     </div>
                     <div className="lg:flex items-center lg:space-x-10 pt-4">
                        <div className="flex items-center space-x-2 lg:w-[9rem]">
                           <Skeleton width={100} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 col-span-5 ">
               <div className="border bg-[#f9fafb] rounded-md p-4">
                  <p className=" font-medium pb-4 text-[#111827] text-lg">
                     <Skeleton width={100} />
                  </p>
                  <div className=" space-y-3 font-normal mb-4">
                     <div className="flex justify-between pt-3 text-black">
                        <span className="text-sm text-gray-600">
                           <Skeleton width={100} />
                        </span>
                        <span>
                           <Skeleton width={100} />
                        </span>
                     </div>
                     <hr />
                     <div className="flex justify-between pt-3">
                        <span className="text-sm text-gray-600">
                           <Skeleton width={100} />
                        </span>
                        <span className="text-green-600">
                           <Skeleton width={100} />
                        </span>
                     </div>
                     <hr />
                     <div className="flex justify-between pt-3">
                        <span className="text-sm text-gray-600">
                           <Skeleton width={100} />
                        </span>
                        <span className=" text-green-600">
                           <Skeleton width={100} />
                        </span>
                     </div>
                     <hr />
                     <div className="flex justify-between pt-3 font-bold">
                        <span className=" font-medium text-[#111827] text-lg">
                           <Skeleton width={100} />
                        </span>
                        <span className="text-green-600">
                           <Skeleton width={100} />
                        </span>
                     </div>
                  </div>
                  <Button
                     variant="contained"
                     className="w-full"
                     sx={{
                        px: "2.5rem",
                        py: ".7rem",
                        bgcolor: "#9155fd",
                     }}
                  >
                     <Skeleton width={100} />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;
