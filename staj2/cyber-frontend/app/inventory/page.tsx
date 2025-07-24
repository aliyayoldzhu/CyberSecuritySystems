"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import InventoryTable from "@/components/InventoryTable";
import { InventoryItem } from "@/types/InventoryItem";
import ClientLayout from "@/components/ClientLayout";

const mockData: InventoryItem[] = [
  {
    id: 1,
    name: "FortiGate 60F",
    model: "FG-60F",
    brand: "Fortinet",
    type: "Firewall",
    detail: "Small business firewall with SD-WAN",
    price: 950,
    available: true,
    condition: "New",
  },
  {
    id: 2,
    name: "Cisco Catalyst 9200",
    model: "C9200-24T",
    brand: "Cisco",
    type: "Switch",
    detail: "Enterprise-class stackable access switch",
    price: 2100,
    available: false,
    condition: "Used",
  },
  {
    id: 3,
    name: "Dell PowerEdge R740",
    model: "R740",
    brand: "Dell",
    type: "Server",
    detail: "2U rack server for data-intensive workloads",
    price: 6700,
    available: true,
    condition: "Refurbished",
  },
  {
    id: 4,
    name: "TP-Link Archer C7",
    model: "AC1750",
    brand: "TP-Link",
    type: "Access Point",
    detail: "Dual-band Wi-Fi router for small offices",
    price: 80,
    available: true,
    condition: "New",
  },
  {
    id: 5,
    name: "Lenovo ThinkPad X1 Carbon",
    model: "X1 Gen 9",
    brand: "Lenovo",
    type: "Laptop",
    detail: "Lightweight business ultrabook",
    price: 1400,
    available: false,
    condition: "Used",
  },
  {
    id: 6,
    name: "Ubiquiti EdgeRouter X",
    model: "ER-X",
    brand: "Ubiquiti",
    type: "Router",
    detail: "Compact router with advanced routing features",
    price: 65,
    available: true,
    condition: "New",
  },
];

export default function InventoryPage() {
  const [query, setQuery] = useState("");

  const filteredItems = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ClientLayout>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Search and manage all network devices and equipment
      </Typography>

      <SearchBar value={query} onChange={setQuery} />

      <InventoryTable items={filteredItems} />
    </ClientLayout>
  );
}