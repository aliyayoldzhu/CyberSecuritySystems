"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Fortinet UTP License",
    brand: "Fortinet",
    condition: "New",
    price: 710112,
    image: "/images/fortinet.png",
    slug: "fc-10-f42hf-950-02-60",
  },
  {
    id: 2,
    name: "DWDM-XFP-C",
    brand: "Cisco",
    condition: "Factory Sealed",
    price: 13337.03,
    image: "/images/dwdm.png",
    slug: "dwdm-xfp-c",
  },
];

export default function CategoryPage() {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Products in this Category
      </Typography>

      <Grid container spacing={3} sx={{ m: 0, width: "100%" }}>
        {products.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderRadius: "1.5rem",
                boxShadow: 3,
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ width: 120, height: 120, objectFit: "contain", mr: 3 }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {product.name}
                </Typography>
                <Typography variant="body2">Brand: {product.brand}</Typography>
                <Typography variant="body2">
                  Condition: {product.condition}
                </Typography>
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ mt: 1, fontWeight: 600 }}
                >
                  ${product.price.toLocaleString()}
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => console.log("Add to cart", product.id)}
                >
                  Add to Cart
                </Button>
                <IconButton
                  color="default"
                  onClick={() => console.log("Favourite", product.id)}
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => router.push(`/product/${product.slug}`)}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
