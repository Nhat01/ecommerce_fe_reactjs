import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Auth/Action";

const LoginForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const userData = {
         firstName: data.get("firstName"),
         lastName: data.get("lastName"),
         email: data.get("email"),
         password: data.get("password"),
      };
      dispatch(login(userData));
   };
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <TextField
                     required
                     name="email"
                     id="email"
                     label="Email"
                     fullWidth
                     autoComplete="email"
                     inputMode="email" // Chỉ định kiểu nhập là email
                     pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Pattern kiểm tra định dạng email
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     required
                     name="password"
                     id="password"
                     label="Password"
                     type="password"
                     fullWidth
                     autoComplete="password"
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button
                     className="bg-[#9155FD] w-full"
                     type="submit"
                     variant="contained"
                     size="large"
                     sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
                  >
                     Login
                  </Button>
               </Grid>
            </Grid>
         </form>
         <div className="flex justify-center items-center flex-col">
            <div className="flex items-center py-3">
               <p>If you don't have account ? </p>
               <Button
                  onClick={() => navigate("/register")}
                  className="ml-5"
                  size="small"
               >
                  Register
               </Button>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
