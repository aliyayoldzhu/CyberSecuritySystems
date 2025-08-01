// app/category/[slug]/page.tsx
import ClientLayout from "@/components/ClientLayout";
import CategoryPage from "@/components/CategoryPage";

export default function CategorySlugPage() {
  return (
    <ClientLayout>
      <CategoryPage />
    </ClientLayout>
  );
}
