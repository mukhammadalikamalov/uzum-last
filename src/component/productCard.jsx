import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Button, Card, CardContent, CardMedia, Dialog, IconButton, Typography } from "@mui/material";
import React, { useState } from 'react';

const ProductCard = ({ good }) => {
  const [status, setStatus] = useState(good && good.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    const newStatus = !status;
    setStatus(newStatus);
    // Update status or perform any other action
  };

  const handleBag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to bag logic
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000); // Close modal after 3 seconds
  };

  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        {/* Product Image */}
        <CardMedia
          component="img"
          alt={good.title}
          height="200px"
          image={good.media[0]}
          title={good.title}
          sx={{
            objectFit: "contain",
            zIndex: 1,
            transition: "transform 0.3s ease-in-out", // Add transition for smooth effect
            "&:hover": {
              transform: "scale(1.1)", // Scale image on hover
            },
          }}
        />

        {/* Like Button */}
        <IconButton
          size="small"
          aria-label="like"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: status ? "#7000FF" : "rgba(255, 255, 255, 0.8)",
            zIndex: 2,
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '50%'
          }}
          onClick={(e) => {
            setStatus(!status);
            handleLike(e);
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ color: status ? "#FFFFFF" : "#000000" }} fontSize="small" />
        </IconButton>

        {/* Content */}
        <CardContent sx={{ flex: "1 0 auto", paddingBottom: 0 }}>
          <Typography color={"#3B3C36"} variant="subtitle1" component="h6" noWrap>
            {good.title}
          </Typography>
          <Typography mt={2} marginBottom={"5%"} variant="caption" color="" component="mark">
            {Math.floor((good.price * 12) / 100)} So'm/oyiga
          </Typography>
          <Box mt={4} marginBottom={"10%"} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body2" color="textSecondary" component="del">
                {good.price - Math.floor((good.price * good.salePercentage) / 100)} So'm
              </Typography>
              <Typography sx={{ fontSize: "16px" }} variant="body2" component="span">
                {good.price} So'm
              </Typography>
            </Box>
            {/* Add to Bag Button */}
            <IconButton size="small" aria-label="Add to Bag" onClick={handleBag}>
              <AddOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>


      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          position: 'absolute',
          top: 0,
          zIndex: 9999,
        }}
      >
        <Box p={2}>
          <Typography variant="h6" align="center">Mahsulot savatga qo'shildi</Typography>
          <CardMedia
            component="img"
            alt={good.title}
            height="150px"
            image={good.media[0]}
            title={good.title}
            sx={{ objectFit: "contain", marginTop: "10px" }}
          />
          <Typography variant="body1" mt={2} mb={4} align="center">
            Explanation about adding the product to the cart goes here.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(false)}>
              Savatga o'tish
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProductCard;
