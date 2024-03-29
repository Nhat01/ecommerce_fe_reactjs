import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";

const RegisterForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const jwt = localStorage.getItem("jwt");
   const { auth } = useSelector((store) => store);

   useEffect(() => {
      if (jwt) {
         dispatch(getUser(jwt));
      }
   }, [jwt, auth.jwt]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const userData = {
         firstName: data.get("firstName"),
         lastName: data.get("lastName"),
         email: data.get("email"),
         password: data.get("password"),
      };
      dispatch(register(userData));
   };
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     required
                     name="firstName"
                     id="firstName"
                     label="First Name"
                     fullWidth
                     autoComplete="given-name"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     required
                     name="lastName"
                     id="lastName"
                     label="Last Name"
                     fullWidth
                     autoComplete="given-name"
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     required
                     name="email"
                     id="email"
                     label="Email"
                     fullWidth
                     autoComplete="email"
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
                     Register
                  </Button>
               </Grid>
            </Grid>
         </form>
         <div className="flex justify-center items-center flex-col">
            <div className="flex items-center py-3">
               <p>If you have already account ? </p>
               <Button
                  onClick={() => navigate("/login")}
                  className="ml-5"
                  size="small"
               >
                  Login
               </Button>
            </div>
         </div>
      </div>
   );
};

export default RegisterForm;
