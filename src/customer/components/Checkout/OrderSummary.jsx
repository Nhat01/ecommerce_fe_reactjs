import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import Cart from "../Cart/Cart";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";

const OrderSummary = () => {
   const location = useLocation();
   const dispatch = useDispatch();
   const { order } = useSelector((store) => store.order);
   const querySearch = new URLSearchParams(location.search);

   const orderId = querySearch.get("order_id");
   useEffect(() => {
      dispatch(getOrderById(orderId));
   }, []);
   console.log(order);
   return (
      <div>
         <div className="p-5 shadow-lg rounded-s-md border">
            <AddressCard address={order?.shippingAddress} />
         </div>
         <Cart orderId={orderId} />
      </div>
   );
};

export default OrderSummary;
