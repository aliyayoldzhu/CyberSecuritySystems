export type DeviceType =
  | "Firewall"
  | "Laptop"
  | "Router"
  | "Switch"
  | "Server"
  | "Access Point";

export interface InventoryItem {
  id: number;
  name: string;
  model: string;
  brand: string;
  type: DeviceType;
  detail: string;
  price: number;
  available: boolean;
  condition: "New" | "Used" | "Refurbished";
}
