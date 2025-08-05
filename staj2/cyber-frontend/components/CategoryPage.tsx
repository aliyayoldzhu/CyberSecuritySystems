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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/useStore";
import { InventoryItem } from "@/types/InventoryItem"; // adjust if needed

interface CategoryPageProps {
  slug: string;
}

const allProducts: InventoryItem[] = [
  {
    id: 1,
    name: "Fortinet UTP License",
    brand: "Fortinet",
    condition: "New",
    price: 710112,
    type: "Firewall",
    available: true,
    detail: "Advanced UTP license for Fortinet appliances",
    model: "FC-10-F42HF-950-02-60",
  },
  {
    id: 2,
    name: "DWDM-XFP-C",
    brand: "Cisco",
    condition: "Refurbished",
    price: 13337.03,
    type: "Switch",
    available: true,
    detail: "DWDM transceiver module",
    model: "DWDM-XFP-C",
  },
];

export default function CategoryPage({ slug }: CategoryPageProps) {
  const router = useRouter();
  const { favorites, toggleFavorite, addToCart } = useStore();

  // filter by slug matching type
  const products = allProducts.filter(
    (product) => product.type.toLowerCase() === slug.toLowerCase()
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Products in {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </Typography>

      <Grid container spacing={3} sx={{ m: 0, width: "100%" }}>
        {products.map((product) => {
          const isFavorited = favorites.some((item) => item.id === product.id);

          return (
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
                  image={`/images/${product.type.toLowerCase()}.png`}
                  alt={product.name}
                  sx={{ width: 120, height: 120, objectFit: "contain", mr: 3 }}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    Brand: {product.brand}
                  </Typography>
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
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>

                  <IconButton onClick={() => toggleFavorite(product)}>
                    {isFavorited ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => router.push(`/product/${product.model}`)}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
