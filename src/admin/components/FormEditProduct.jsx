import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../State/Category/Action";
import { updateProduct } from "../../State/Product/Action";

const FormEditProduct = ({ product: initialProduct }) => {
   const dispatch = useDispatch();
   const { categories } = useSelector((store) => store.category);
   const [product, setProduct] = useState(initialProduct);
   const [image, setImage] = useState(product.imageUrl);
   const [file, setFile] = useState(null);
   const fileInputRef = useRef(null);

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

      let updatedCategories = [...product.category];
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
      const updatedSizes = [...product.sizes];
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
            secondLevelCategory: product.category.find((cat) => cat.level === 2)
               ?.name,
            thirdLevelCategory: product.category.find((cat) => cat.level === 1)
               ?.name,
            description: product.description,
            status: parseInt(product.status),
         })
      );
      dispatch(updateProduct(product._id, formData));
   };
   return (
      <form className="mx-4 mt-4 pb-4" onSubmit={handleSubmit}>
         <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleAvatarChange}
         />
         <div className="flex justify-center mb-5" onClick={handleClickAvatar}>
            <img
               className="w-20 h-20 rounded-lg cursor-pointer"
               src={image}
               alt="Rounded avatar"
            />
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
                     value={product.brand}
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
                     value={product.title}
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
                     value={product.color}
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
                     value={product.quantity}
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
                     value={product.price}
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
                  value={product.discountPercent}
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
                     value={product.discountedPrice}
                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                     pattern="^[0-9.]+$"
                     required
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
                  value={product.category[0].name}
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
                  value={product.category[1].name}
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
                  value={product.category[2].name}
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
                  value={product.description}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 "
                  required
                  onChange={handleChange}
               />
               <span className="mt-1 hidden text-sm text-red-400">
                  Description must be at least 2 characters.{" "}
               </span>
            </div>
         </div>
         {product.sizes.map((item, index) => (
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
                        value={item.name}
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
                        value={item.quantity}
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
                  value={product.status}
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

export default FormEditProduct;
