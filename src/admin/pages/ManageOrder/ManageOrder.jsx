import {
   Avatar,
   AvatarGroup,
   Box,
   Button,
   Menu,
   MenuItem,
   Typography,
   useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState } from "react";
import FormEditUser from "../../components/FormEditUser";
import { getUsers } from "../../../State/User/Action";
import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../State/Product/Action";
import FormEditProduct from "../../components/FormEditProduct";
import FormCreateProduct from "../../components/FormCreateProduct";
import * as XLSX from "xlsx";
import {
   cancelOrder,
   confirmOrder,
   deliverOrder,
   getAllOrder,
   shipOrder,
} from "../../../State/Order/Action";

const ManageOrder = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const { orders, order: updatedOrder } = useSelector((store) => store.order);
   const [openModelCreate, setOpenModelCreate] = useState(false);
   const [product, setProduct] = useState(null);
   const [open, setOpen] = useState(false);
   const [anchorElArray, setAnchorElArray] = useState([]);

   const handleClick = (event, index) => {
      const newAnchorElArray = [...anchorElArray];
      newAnchorElArray[index] = event.currentTarget;
      setAnchorElArray(newAnchorElArray);
   };

   const handleCloseMenu = (index) => {
      setAnchorElArray([]);
   };

   const handleClickEdit = (user) => {
      setProduct(user);
   };
   const handleCloseModel = () => {
      setProduct(null);
      setOpenModelCreate(false);
   };
   const handleConfirmed = (orderId) => {
      console.log(orderId);
      dispatch(confirmOrder(orderId));
   };
   const handleShipped = (orderId) => {
      dispatch(shipOrder(orderId));
   };
   const handleDelivered = (orderId) => {
      dispatch(deliverOrder(orderId));
   };
   const handleExport = () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(orders);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Save the workbook as a file
      XLSX.writeFile(wb, "orders.xlsx");
   };
   const handleCancel = (orderId) => {
      dispatch(cancelOrder(orderId));
   };

   useEffect(() => {
      dispatch(getAllOrder());
   }, [updatedOrder]);

   console.log(orders);

   return (
      <Box m="20px">
         <div className="flex flex-col justify-center space-y-2">
            <h2 className="text-4xl font-semibold leading-6 text-gray-300 mb-1">
               ORDERS
            </h2>

            <div className="flex justify-between">
               <h5 className="mt-2 text-base font-normal leading-5 text-teal-400">
                  Managing the Orders
               </h5>
               <button
                  type="button"
                  onClick={() => handleExport()}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2"
               >
                  Export
               </button>
            </div>
         </div>

         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" className="px-6 py-3">
                        Image
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Title
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Price
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Status
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Update
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {orders?.map((order, index) => (
                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                           scope="row"
                           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                           <AvatarGroup
                              max={2}
                              sx={{ justifyContent: "start" }}
                           >
                              {order.orderItems.map((orderItem) => (
                                 <Avatar src={orderItem.product.imageUrl} />
                              ))}
                           </AvatarGroup>
                        </th>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {order.orderItems.map((orderItem) => (
                              <p className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 {orderItem.product.title}
                              </p>
                           ))}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {order.totalDiscountedPrice}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <div
                              className={`flex items-center w-20 px-1 py-2 rounded-md justify-center ${
                                 order.orderStatus === "CONFIRMED"
                                    ? "bg-[#369236]"
                                    : order.orderStatus === "SHIPPED"
                                    ? "bg-[#4141ff]"
                                    : order.orderStatus === "PLACED"
                                    ? "bg-[#02b290]"
                                    : order.orderStatus === "PENDING"
                                    ? "bg-[gray]"
                                    : "bg-[red]"
                              }`}
                           >
                              {order.orderStatus}
                           </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <Button
                              className="text-white"
                              onClick={(event) => handleClick(event, index)}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              sx={{ color: "white" }}
                           >
                              Status
                           </Button>
                           <Menu
                              id="basic-menu"
                              anchorEl={anchorElArray[index]}
                              open={Boolean(anchorElArray[index])}
                              onClose={handleCloseMenu}
                              MenuListProps={{
                                 "aria-labelledby": "basic-button",
                              }}
                           >
                              <MenuItem
                                 onClick={() => handleConfirmed(order._id)}
                              >
                                 Confirmed Order
                              </MenuItem>
                              <MenuItem
                                 onClick={() => handleShipped(order._id)}
                              >
                                 Shipped Order
                              </MenuItem>
                              <MenuItem
                                 onClick={() => handleDelivered(order._id)}
                              >
                                 Delivered Order
                              </MenuItem>
                              <MenuItem onClick={() => handleCancel(order._id)}>
                                 Cancel Order
                              </MenuItem>
                           </Menu>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <nav
               className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
               aria-label="Table navigation"
            >
               <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                     1-10
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                     1000
                  </span>
               </span>
               <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        Previous
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        1
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        2
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        aria-current="page"
                        className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                     >
                        3
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        4
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        5
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        Next
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
      </Box>
   );
};

export default ManageOrder;
