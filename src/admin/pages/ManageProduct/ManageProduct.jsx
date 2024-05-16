import { Box, Typography, useTheme } from "@mui/material";
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

const ManageProduct = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const {
      products,
      totalPages,
      product: updatedProduct,
   } = useSelector((store) => store.products);
   const [openModelCreate, setOpenModelCreate] = useState(false);
   const [product, setProduct] = useState(null);

   const handleClickEdit = (product) => {
      setProduct(product);
   };
   const handleCloseModel = () => {
      setProduct(null);
      setOpenModelCreate(false);
   };

   const handleExport = () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(products);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Save the workbook as a file
      XLSX.writeFile(wb, "products.xlsx");
   };
   useEffect(() => {
      dispatch(getProducts({ pageSize: 10, pageNumber: 1 }));
      setProduct(null);
      setOpenModelCreate(false);
   }, [updatedProduct]);

   console.log(products);

   return (
      <Box m="20px">
         <div className="flex flex-col justify-center space-y-2">
            <h2 className="text-4xl font-semibold leading-6 text-gray-300 mb-1">
               PRODUCTS
            </h2>

            <div className="flex justify-between">
               <h5 className="mt-2 text-base font-normal leading-5 text-teal-400">
                  Managing the Products
               </h5>
               <div>
                  <button
                     type="button"
                     onClick={() => setOpenModelCreate(true)}
                     className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2"
                  >
                     Create
                  </button>
                  <button
                     type="button"
                     onClick={() => handleExport()}
                     className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2"
                  >
                     Export
                  </button>
               </div>
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
                        Category
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Price
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Quantity
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Status
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {products?.map((product) => (
                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                           scope="row"
                           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                           <img
                              className="w-10 h-10 rounded-full cursor-pointer"
                              src={product.imageUrl}
                              alt="Rounded avatar"
                           />
                        </th>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {product.title}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {product.category[0].name}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {product.price}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {product.quantity}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <div className="flex items-center w-20 bg-green-600 px-1 py-2 rounded-md justify-center">
                              {product.status === 1 && "Selling"}
                              {product.status === 0 && "Stop Selling"}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <button
                              onClick={() => handleClickEdit(product)}
                              type="button"
                              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2"
                           >
                              Edit
                           </button>
                        </td>
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

         {product && (
            <div className=" overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-[120] justify-center items-center w-full h-full md:inset-0 max-h-full bg-black bg-opacity-50">
               <div className="relative p-4 w-full max-w-2xl top-[240px]">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                     <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                           Static modal
                        </h3>
                        <button
                           type="button"
                           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                           onClick={() => handleCloseModel()}
                        >
                           <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                           >
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                           </svg>
                        </button>
                     </div>

                     <FormEditProduct product={product} />
                  </div>
               </div>
            </div>
         )}

         {openModelCreate && (
            <div className="overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-[120] justify-center items-center w-full h-full md:inset-0 max-h-full bg-black bg-opacity-50">
               <div className="relative p-4 w-full max-w-2xl top-[240px]">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                     <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                           Static modal
                        </h3>
                        <button
                           type="button"
                           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                           onClick={() => handleCloseModel()}
                        >
                           <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                           >
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                           </svg>
                        </button>
                     </div>

                     <FormCreateProduct />
                  </div>
               </div>
            </div>
         )}
      </Box>
   );
};

export default ManageProduct;
