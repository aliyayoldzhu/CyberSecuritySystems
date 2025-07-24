"use client";

import { InventoryItem } from "@/types/InventoryItem";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

interface Props {
  items: InventoryItem[];
}

export default function InventoryTable({ items }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Model</strong>
            </TableCell>
            <TableCell>
              <strong>Brand</strong>
            </TableCell>
            <TableCell>
              <strong>Type</strong>
            </TableCell>
            <TableCell>
              <strong>Condition</strong>
            </TableCell>
            <TableCell>
              <strong>Price ($)</strong>
            </TableCell>
            <TableCell>
              <strong>Available</strong>
            </TableCell>
            <TableCell>
              <strong>Details</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography variant="body2">
                  No items match your search.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Chip
                    label={item.condition}
                    color={
                      item.condition === "New"
                        ? "success"
                        : item.condition === "Used"
                        ? "warning"
                        : "info"
                    }
                  />
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  {item.available ? (
                    <Chip label="Yes" color="success" size="small" />
                  ) : (
                    <Chip label="No" color="default" size="small" />
                  )}
                </TableCell>
                <TableCell>{item.detail}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
