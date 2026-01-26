export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://айкос-илюма.рф/api/products/getterea", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title = "Стики Terea для Айкос Илюма — все вкусы в Москве";
  return {
    title,
    description:
      "Большой выбор вкусов стиков Terea. Только свежие партии. Быстрая доставка и выгодные цены в Москве.",
    alternates: {
      canonical: `https://айкос-илюма.рф/products/stiki-terea-dlya-iqos-iluma`,
    },
    openGraph: {
      title: `Стики Terea для Айкос Илюма — все вкусы в Москве`,
      description: `Большой выбор вкусов стиков Terea. Только свежие партии. Быстрая доставка и выгодные цены в Москве.`,
      url: `https://айкос-илюма.рф/products/stiki-terea-dlya-iqos-iluma`,
      images: [
        {
          url: `/favicon/web-app-manifest-512x512`,
          alt: `IqosILuma`,
        },
      ],
    },
  };
}

export default async function Page() {
  let items = [];
  try {
    items = await fetchItems();
  } catch (error) {
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div className="products-container">
      <h1 className="page-title">
        Купить стики Terea для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
