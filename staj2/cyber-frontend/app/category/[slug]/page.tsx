"use client";

import { useParams } from "next/navigation";
import ClientLayout from "@/components/ClientLayout";
import CategoryPage from "@/components/CategoryPage";

export default function CategorySlugPage() {
  const { slug } = useParams();

  return (
    <ClientLayout>
      <CategoryPage slug={slug as string} />
    </ClientLayout>
  );
}
