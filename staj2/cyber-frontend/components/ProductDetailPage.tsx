"use client";

import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

// You will later fetch this using params.slug from the backend
const product = {
  id: 1,
  name: "Fortinet UTP License",
  model: "FC-10-F42HF-950-02-60",
  brand: "Fortinet",
  condition: "New",
  availability: "In stock",
  price: 710112,
  image: "/images/fortinet.png",
};

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrease = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    console.log("Add to cart:", product.id, "Quantity:", quantity);
    // send to backend/cart logic
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={6} alignItems="center">
        {/* Left: Large Product Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        {/* Right: Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={700}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Model: <strong>{product.model}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Brand: <strong>{product.brand}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Condition: <strong>{product.condition}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Availability:{" "}
            <strong
              style={{
                color: product.availability === "In stock" ? "green" : "red",
              }}
            >
              {product.availability}
            </strong>
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h5"
            fontWeight={600}
            color="error"
            sx={{ mb: 2 }}
          >
            ${product.price.toLocaleString()}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Quantity Control */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                px: 1,
              }}
            >
              <IconButton onClick={decrease} disabled={quantity === 1}>
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ mx: 1, width: 24, textAlign: "center" }}
              >
                {quantity}
              </Typography>
              <IconButton onClick={increase} disabled={quantity === 99}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Add to Cart */}
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
            </Button>

            {/* Favourite */}
            <IconButton
              color="default"
              onClick={() => console.log("Favourite", product.id)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
