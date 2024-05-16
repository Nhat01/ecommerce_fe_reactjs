import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../State/User/Action";

const FormEditUser = ({ user: initialUser }) => {
   const dispatch = useDispatch();
   const [user, setUser] = useState(initialUser);
   const [showPassword, setShowPassword] = useState(false);
   const [avatar, setAvatar] = useState(
      "https://flowbite.com/docs/images/logo.svg"
   );
   const fileInputRef = useRef(null);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
         ...prevUser,
         [name]: value,
      }));
   };

   const handleRoleChange = (role) => {
      setUser((prevUser) => ({
         ...prevUser,
         role: role,
      }));
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
         setAvatar(reader.result);
         setUser((prevUser) => ({
            ...prevUser,
            imageUrl: reader.result, // Lưu đường dẫn ảnh vào trường imageUrl của user
         }));
      };
      if (file) {
         reader.readAsDataURL(file);
      }
   };

   const handleClickAvatar = () => {
      fileInputRef.current.click();
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(editUser(user));
   };

   return (
      <form className="max-w-sm mx-auto mt-4 pb-4" onSubmit={handleSubmit}>
         <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleAvatarChange}
         />
         <div className="flex justify-center mb-5" onClick={handleClickAvatar}>
            <img
               className="w-14 h-14 rounded-full cursor-pointer"
               src={avatar}
               alt="Rounded avatar"
            />
         </div>
         <div className="mb-5">
            <label
               htmlFor="firstName"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
               First Name
            </label>
            <input
               type="text"
               id="firstName"
               name="firstName"
               value={user.firstName}
               onChange={handleChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="name"
               required
            />
         </div>
         <div className="mb-5">
            <label
               htmlFor="lastName"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
               Last Name
            </label>
            <input
               type="text"
               id="lastName"
               name="lastName"
               value={user.lastName}
               onChange={handleChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="name"
               required
            />
         </div>
         <div className="mb-5">
            <label
               htmlFor="email"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
               Email
            </label>
            <input
               type="email"
               id="email"
               name="email"
               value={user.email}
               onChange={handleChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="name@flowbite.com"
               required
            />
         </div>
         {/* <div className="relative mt-5">
            <label
               htmlFor="password"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
               Password
            </label>
            <input
               type={showPassword ? "text" : "password"}
               id="password"
               name="password"
               value={user.password}
               onChange={handleChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Password"
               required
            />
            <button
               type="button"
               onClick={togglePasswordVisibility}
               className="absolute right-0 bottom-[11px] pr-3 focus:outline-none"
            >
               {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
         </div> */}
         <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               Role
            </label>
            <div className="mt-5 flex space-x-2">
               <div
                  className={`flex items-center w-20 px-1 py-2 rounded-md cursor-pointer ${
                     user.role === "Admin"
                        ? "bg-green-600"
                        : "bg-gray-200 text-zinc-600"
                  }`}
                  onClick={() => handleRoleChange("Admin")}
               >
                  <AdminPanelSettingsOutlinedIcon />
                  <Typography ml={1}>Admin</Typography>
               </div>
               <div
                  className={`flex items-center w-24 px-1 py-2 rounded-md cursor-pointer ${
                     user.role === "Manager"
                        ? "bg-green-600"
                        : "bg-gray-200 text-zinc-600"
                  }`}
                  onClick={() => handleRoleChange("Manager")}
               >
                  <SecurityOutlinedIcon />
                  <Typography ml={1}>Manager</Typography>
               </div>
               <div
                  className={`flex items-center w-20 px-1 py-2 rounded-md cursor-pointer ${
                     user.role === "User"
                        ? "bg-green-600"
                        : "bg-gray-200 text-zinc-600"
                  }`}
                  onClick={() => handleRoleChange("User")}
               >
                  <LockOpenOutlinedIcon />
                  <Typography ml={1}>User</Typography>
               </div>
            </div>
         </div>
         <button
            type="submit"
            className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         >
            Save
         </button>
      </form>
   );
};

export default FormEditUser;
