import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { products } from "@/content/products";
import { site } from "@/content/site";

const product = products.bms;

export const metadata: Metadata = {
  title: product.name,
  description: product.hero.lead,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  description: product.hero.lead,
  url: `${site.url}/bms/`,
  operatingSystem: "Windows",
  applicationCategory: "BusinessApplication",
};

export default function BmsPage() {
  return (
    <>
      <ProductPage product={product} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
