export interface Product {
  name: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    name: "FortiGate 60F",
    category: "firewalls",
    description: "Small business firewall with deep packet inspection.",
  },
  {
    name: "Palo Alto PA-220",
    category: "firewalls",
    description: "Next-gen threat protection in a compact form.",
  },
  {
    name: "Cisco Catalyst 1000",
    category: "switches",
    description: "Managed layer-2 switch for small deployments.",
  },
  {
    name: "TP-Link TL-SG105",
    category: "switches",
    description: "Unmanaged switch with 5 gigabit ports.",
  },
  {
    name: "Juniper SRX300",
    category: "routers",
    description: "Secure SD-WAN enabled enterprise router.",
  },
  {
    name: "MikroTik hEX",
    category: "routers",
    description: "Powerful, affordable router for wired networks.",
  },
];
