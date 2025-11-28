export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems(type, ref) {
  const res = await fetch(
    `https://айкос-илюма.рф/api/products/getproductinfo/${type}/${ref}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata({ params }) {
  const { type, ref } = await params;
  let items = [];
  try {
    items = await fetchItems(type, ref);
  } catch (error) {
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
  }
  return {
    title: `Купить ${items.name} с доставкой по России`,
    description: `${items.description}`,
    alternates: {
      canonical: `https://айкос-илюма.рф/products/product-info/${items.type}/${items.ref}`,
    },
    openGraph: {
      title: `Купить ${items.name} с доставкой по России`,
      description: `${items.description}`,
      url: `https://айкос-илюма.рф/products/product-info/${items.type}/${items.ref}`,
      images: [
        {
          url: `/images/${items.image}`,
          alt: items.name,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { type, ref } = await params;
  let items = [];
  try {
    items = await fetchItems(type, ref);
  } catch (error) {
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
  }

  return <ClientFilters items={items} />;
}
