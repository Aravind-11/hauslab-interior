import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Furniture Catalog",
  description: "Browse curated furniture with filters by category, style, and price.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
