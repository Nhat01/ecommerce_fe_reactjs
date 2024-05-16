import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { Fragment, useRef, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
   getCart,
   removeItemToCart,
   updateItemToCart,
} from "../../../State/Cart/Action";
import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
const CartItem = ({ cartItem, openModal, setCartItemId }) => {
   const [open, setOpen] = useState(false);
   const [quantity, setQuantity] = useState(cartItem.quantity);

   // Lấy số lượng tối đa của sản phẩm
   const maxQuantity = cartItem.product.sizes.find(
      (size) => size.name === cartItem.size
   ).quantity;
   const dispatch = useDispatch();
   const handleClick = () => {
      openModal();
      setCartItemId(cartItem._id);
   };

   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }
      setOpen(false);
   };
   console.log("cartItem: ", cartItem);
   const handleRemove = (cartItemId) => {
      const reqData = {
         cartItemId: cartItemId,
         data: {
            quantity: quantity - 1,
         },
      };
      dispatch(updateItemToCart(reqData));
      setQuantity((prevQuantity) => prevQuantity - 1);
   };

   const handleAdd = (cartItemId) => {
      const reqData = {
         cartItemId: cartItemId,
         data: {
            quantity: quantity + 1,
         },
      };
      dispatch(updateItemToCart(reqData));
      setQuantity((prevQuantity) => prevQuantity + 1);
   };
   return (
      <>
         <div className="p-5 shadow-lg border rounded-md  mb-10">
            <div className="flex items-center relative">
               <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                  <img
                     className="w-full h-full object-cover object-top"
                     src={cartItem?.product?.imageUrl}
                     alt={cartItem?.product?.title}
                  />
               </div>

               <div className="ml-5 space-y-1">
                  <p className="font-semibold">{cartItem?.product.title}</p>
                  <p className=" opacity-70">Size: {cartItem?.size}</p>
                  <p className=" opacity-70 mt-2">
                     Seller: {cartItem?.product.brand}
                  </p>
                  <div className="flex space-x-5 items-center text-gray-900 pt-6">
                     <p className="font-semibold">
                        ${cartItem?.product.discountedPrice}
                     </p>
                     <p className="opacity-50 line-through">
                        ${cartItem?.product?.price}
                     </p>
                     <p className="font-semibold text-green-600">
                        {cartItem?.product?.discountPercent}% Off
                     </p>
                  </div>
               </div>
               <div className=" absolute top-0 right-0">
                  <CloseIcon
                     onClick={() => handleClick(cartItem?._id)}
                     sx={{ fontSize: "20px" }}
                     className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  />
               </div>
            </div>
            <div className="lg:flex items-center lg:space-x-10 pt-4">
               <div className="flex items-center space-x-2 lg:w-[9rem]">
                  <IconButton
                     onClick={() => handleRemove(cartItem?._id)}
                     sx={{ color: "RGB(145 85 253)" }}
                     disabled={quantity > 1 ? false : true}
                  >
                     <RemoveCircleOutlineIcon />
                  </IconButton>
                  <span className="py-1 px-5 border rounded-sm">
                     {quantity}
                  </span>
                  <IconButton
                     sx={{ color: "RGB(145 85 253)" }}
                     disabled={quantity === maxQuantity}
                     onClick={() => handleAdd(cartItem?._id)}
                  >
                     <AddCircleOutlineIcon />
                  </IconButton>
               </div>
            </div>
            <Snackbar
               open={open}
               autoHideDuration={4000}
               onClose={handleClose}
               anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
               <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
               >
                  This is a success message!
               </Alert>
            </Snackbar>
         </div>
      </>
   );
};

export default CartItem;
