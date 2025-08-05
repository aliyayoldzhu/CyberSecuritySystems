"use client";

import {
  Box,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useStore } from "@/stores/useStore";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const [open, setOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState<any>(null);

  const handleRemove = (product: any) => {
    setProductToRemove(product);
    setOpen(true);
  };

  const confirmRemove = () => {
    toggleFavorite(productToRemove);
    setOpen(false);
    setProductToRemove(null);
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((product) => (
          <Grid item key={product.name} xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography fontWeight="bold">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </div>
              <Box>
                <IconButton onClick={() => handleRemove(product)}>
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton onClick={() => addToCart(product)}>
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove from Favorites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from favorites?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmRemove}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
