"use client";

import {
  Box,
  Typography,
  Grid,
  Checkbox,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useStore } from "@/stores/useStore";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const { cart, removeFromCart } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [toRemove, setToRemove] = useState<any>(null);

  const handleToggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleRemove = (product: any) => {
    setToRemove(product);
    setOpen(true);
  };

  const confirmRemove = () => {
    removeFromCart(toRemove);
    setOpen(false);
    setToRemove(null);
  };

  const total = cart
    .filter((p) => selected.includes(p.name))
    .reduce((acc, p) => acc + p.price, 0);

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Cart
      </Typography>
      <Grid container spacing={3}>
        {cart.map((product) => (
          <Grid item key={product.name} xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                checked={selected.includes(product.name)}
                onChange={() => handleToggle(product.name)}
              />
              <Box>
                <Typography fontWeight="bold">{product.name}</Typography>
                <Typography>${product.price}</Typography>
              </Box>
              <IconButton onClick={() => handleRemove(product)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={5} display="flex" justifyContent="space-between">
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={selected.length === 0}
        >
          Proceed to Payment
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove from Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from your cart?
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
