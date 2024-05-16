import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function BasicPopover() {
   const [anchorElement, setAnchorElement] = React.useState(null);

   const handleMouseEnter = (event) => {
      setAnchorElement(event.currentTarget);
   };

   const handleMouseLeave = () => {
      setAnchorElement(null);
   };

   const openPop = Boolean(anchorElement);
   const id = openPop ? "simple-popover" : undefined;

   return (
      <div>
         <Button
            aria-describedby={id}
            variant="contained"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            Hover me
         </Button>
         <Popover
            id={id}
            open={openPop}
            anchorEl={anchorElement}
            onClose={handleMouseLeave}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            PaperProps={{
               style: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  borderRadius: 0,
               },
            }}
         >
            <Box
               sx={{
                  position: "relative",
                  mt: "10px",
                  "&::before": {
                     backgroundColor: "white",
                     content: '""',
                     display: "block",
                     position: "absolute",
                     width: 12,
                     height: 12,
                     top: -6,
                     transform: "rotate(45deg)",
                     left: "calc(50% - 6px)",
                  },
               }}
            />
            <Typography sx={{ p: 2, backgroundColor: "white" }}>
               The content of the Popover.
            </Typography>
         </Popover>
      </div>
   );
}
