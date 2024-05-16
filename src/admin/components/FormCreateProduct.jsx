import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../State/Category/Action";
import { createProduct, updateProduct } from "../../State/Product/Action";

const FormCreateProduct = () => {
   const dispatch = useDispatch();
   const { categories } = useSelector((store) => store.category);
   const [product, setProduct] = useState({
      discountedPrice: 0,
      discountPercent: 0,
      category: [
         { level: 3, name: "top" },
         { level: 2, name: "Clothing" },
         { level: 1, name: "Women" },
      ],
   });
   const [image, setImage] = useState(null);
   const [file, setFile] = useState(null);
   const fileInputRef = useRef(null);
   const [showImageWarning, setShowImageWarning] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
         ...prevProduct,
         [name]: value,
      }));
   };

   console.log("product change", product);

   const handlePriceChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
         ...prevProduct,
         [name]: value,
         discountedPrice:
            name === "price"
               ? calculateDiscountedPrice(value, product.discountPercent)
               : calculateDiscountedPrice(product.price, value),
      }));
   };

   const handleCategoryChange = (e) => {
      const { value, name } = e.target;
      const selectedCategory = categories.find(
         (category) => category.name === value
      );
      const updatedCategory = {
         level: selectedCategory.level,
         name: selectedCategory.name,
      };

      // Ensure product.category is initialized as an array
      let updatedCategories = Array.isArray(product.category)
         ? [...product.category]
         : [];
      switch (name) {
         case "topLevelCategory":
            updatedCategories[0] = updatedCategory;
            break;
         case "secondLevelCategory":
            updatedCategories[1] = updatedCategory;
            break;
         case "thirdLevelCategory":
            updatedCategories[2] = updatedCategory;
            break;
         default:
            break;
      }

      setProduct((prevProduct) => ({
         ...prevProduct,
         category: updatedCategories,
      }));
   };

   console.log(fileInputRef);

   const handleSizeChange = (e, index) => {
      const { value, name } = e.target;
      // Ensure product.sizes is initialized as an array
      const updatedSizes = Array.isArray(product.sizes)
         ? [...product.sizes]
         : [];
      updatedSizes[index] = {
         ...updatedSizes[index],
         [name.split("_")[0]]: value,
      };
      setProduct((prevProduct) => ({
         ...prevProduct,
         sizes: updatedSizes,
      }));
   };
   useEffect(() => {
      dispatch(getAllCategory());
   }, []);

   const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (file === undefined) {
         setProduct((prevProduct) => ({
            ...prevProduct,
            imageUrl: undefined,
         }));
      }
      const reader = new FileReader();
      reader.onloadend = () => {
         setImage(reader.result);
         setFile(file);
         setProduct((prevProduct) => ({
            ...prevProduct,
            imageUrl: reader.result, // Lưu đường dẫn ảnh vào trường imageUrl của user
         }));
      };
      if (file) {
         reader.readAsDataURL(file);
         setShowImageWarning(false);
      }
   };

   const calculateDiscountedPrice = (price, discountPercent) => {
      const discountAmount =
         (parseFloat(price) * parseFloat(discountPercent)) / 100;
      const discountedPrice = parseFloat(price) - discountAmount;
      return discountedPrice;
   };

   const handleClickAvatar = () => {
      fileInputRef.current.click();
   };

   const handleSubmit = (e) => {
      if (!image) {
         setShowImageWarning(true);
         e.preventDefault(); // Prevent form submission if image is not selected
      } else {
         e.preventDefault();
         const sizes = product.sizes.map((size) => ({
            name: size.name,
            quantity: parseInt(size.quantity),
         }));

         const formData = new FormData();

         formData.append("file", file); // Đây là file bạn muốn tải lên
         formData.append(
            "product",
            JSON.stringify({
               imageUrl: product.imageUrl,
               brand: product.brand,
               title: product.title,
               color: product.color,
               discountedPrice: product.discountedPrice,
               price: parseInt(product.price),
               discountPercent: product.discountPercent,
               size: sizes,
               quantity: parseInt(product.quantity),
               topLevelCategory: product.category.find((cat) => cat.level === 3)
                  ?.name,
               secondLevelCategory: product.category.find(
                  (cat) => cat.level === 2
               )?.name,
               thirdLevelCategory: product.category.find(
                  (cat) => cat.level === 1
               )?.name,
               description: product.description,
               status: parseInt(product.status),
            })
         );
         console.log("product: ", product);
         dispatch(createProduct(formData));
      }
   };
   console.log("product change: ", product);
   return (
      <form className="mx-4 mt-4 pb-4" onSubmit={handleSubmit}>
         <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleAvatarChange}
         />
         <div
            className="flex justify-center items-center flex-col mb-5"
            onClick={handleClickAvatar}
         >
            <img
               className="w-20 h-20 rounded-lg cursor-pointer"
               src={
                  image ||
                  "data:image/jpeg;base64,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"
               }
               alt="Rounded avatar"
            />
            {showImageWarning && (
               <span className="text-sm text-red-400 block mb-2">
                  Please select an image.
               </span>
            )}
         </div>
         <div className="mb-5 flex gap-3">
            <div className="flex-1">
               <label
                  htmlFor="brand"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Brand
               </label>
               <div className="flex flex-col items-start">
                  <input
                     type="text"
                     name="brand"
                     placeholder="Brand"
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern=".{2,}"
                     required
                     onChange={handleChange}
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                     Brand must be at least 2 characters.{" "}
                  </span>
               </div>
            </div>
            <div className="flex-1">
               <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Title
               </label>
               <div className="flex flex-col items-start">
                  <input
                     type="text"
                     name="title"
                     placeholder="title"
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern=".{2,}"
                     required
                     onChange={handleChange}
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                     Title must be at least 2 characters.{" "}
                  </span>
               </div>
            </div>
         </div>
         <div className="mb-5 flex gap-3">
            <div className="flex-1">
               <label
                  htmlFor="color"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Color
               </label>
               <div className="flex flex-col items-start">
                  <input
                     type="text"
                     name="color"
                     placeholder="color"
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern=".{2,}"
                     required
                     onChange={handleChange}
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                     Color must be at least 2 characters.{" "}
                  </span>
               </div>
            </div>
            <div className="flex-1">
               <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Quantity
               </label>
               <div className="flex flex-col items-start">
                  <input
                     type="text"
                     name="quantity"
                     placeholder="quantity"
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern="[0-9]*"
                     required
                     onChange={handleChange}
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                     Quantity must be number.{" "}
                  </span>
               </div>
            </div>
         </div>
         <div className="mb-5 flex gap-3">
            <div className="flex-1">
               <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Price
               </label>
               <div className="flex flex-col items-start">
                  <input
                     type="text"
                     name="price"
                     placeholder="price"
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern="^[0-9.]+$"
                     required
                     onChange={handlePriceChange}
                     title="Please enter a valid price"
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                     Price must contain at least 1 number or dot.{" "}
                  </span>
               </div>
            </div>
            <div className="flex-1">
               <label
                  for="discountPercent"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Discount percentage
               </label>
               <select
                  id="discountPercent"
                  onChange={handlePriceChange}
                  name="discountPercent"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
               >
                  {[...Array(101).keys()].map((i) => (
                     <option key={i} value={i}>
                        {i}%
                     </option>
                  ))}
               </select>
            </div>
            <div className="flex-1">
               <label
                  htmlFor="discountedPrice"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Discounted Price
               </label>
               <div className="flex flex-col items-start">
                  <input
                     type="text"
                     name="discountedPrice"
                     placeholder="discountedPrice"
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern="^[0-9.]+$"
                     required
                     value={product.discountedPrice}
                     onChange={handleChange}
                     title="Please enter a valid discountedPrice"
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                     DiscountedPrice must contain at least 1 number or dot.{" "}
                  </span>
               </div>
            </div>
         </div>
         <div className="mb-5 flex gap-3">
            <div className="flex-1">
               <label
                  htmlFor="topLevelCategory"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Top Level Category
               </label>

               <select
                  id="topLevelCategory"
                  onChange={handleCategoryChange}
                  name="topLevelCategory"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
               >
                  {categories &&
                     categories
                        .filter((category) => category.level === 3)
                        .map((category) => (
                           <option key={category._id} value={category.name}>
                              {category.name}
                           </option>
                        ))}
               </select>
            </div>
            <div className="flex-1">
               <label
                  htmlFor="secondLevelCategory"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Second Level Category
               </label>

               <select
                  id="secondLevelCategory"
                  onChange={handleCategoryChange}
                  name="secondLevelCategory"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
               >
                  {categories &&
                     categories
                        .filter((category) => category.level === 2)
                        .map((category) => (
                           <option key={category._id} value={category.name}>
                              {category.name}
                           </option>
                        ))}
               </select>
            </div>
            <div className="flex-1">
               <label
                  htmlFor="thirdLevelCategory"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
               >
                  Third Level Category
               </label>

               <select
                  id="thirdLevelCategory"
                  onChange={handleCategoryChange}
                  name="thirdLevelCategory"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
               >
                  {categories &&
                     categories
                        .filter((category) => category.level === 1)
                        .map((category) => (
                           <option key={category._id} value={category.name}>
                              {category.name}
                           </option>
                        ))}
               </select>
            </div>
         </div>
         <div className="mb-5">
            <label
               htmlFor="description"
               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
               Description
            </label>
            <div className="flex flex-col items-start">
               <textarea
                  name="description"
                  placeholder="description"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                  required
                  onChange={handleChange}
               />
               <span className="mt-1 hidden text-sm text-red-400">
                  Description must be at least 2 characters.{" "}
               </span>
            </div>
         </div>
         {[1, 1, 1].map((item, index) => (
            <div key={index} className="mb-5 flex gap-3">
               <div className="flex-1">
                  <label
                     htmlFor={`name_${index}`}
                     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Size
                  </label>
                  <div className="flex flex-col items-start">
                     <input
                        type="text"
                        name={`name_${index}`}
                        placeholder="size"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                        required
                        onChange={(e) => handleSizeChange(e, index)}
                     />
                  </div>
               </div>
               <div className="flex-1">
                  <label
                     htmlFor={`quantity_${index}`}
                     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Quantity
                  </label>
                  <div className="flex flex-col items-start">
                     <input
                        type="text"
                        name={`quantity_${index}`}
                        placeholder="quantity"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                        pattern="[0-9]*"
                        required
                        onChange={(e) => handleSizeChange(e, index)}
                     />
                     <span className="mt-1 hidden text-sm text-red-400">
                        Quantity must be a number.
                     </span>
                  </div>
               </div>
            </div>
         ))}
         <div className="mb-5 flex gap-3">
            <div className="flex-1">
               <label
                  for="status"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Status
               </label>
               <select
                  id="status"
                  onChange={handleChange}
                  name="status"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
               >
                  <option value={1}>Selling</option>
                  <option value={0}>Stop Selling</option>
               </select>
            </div>
         </div>
         <div className="flex justify-end">
            <button
               type="submit"
               className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Save
            </button>
         </div>
      </form>
   );
};

export default FormCreateProduct;
