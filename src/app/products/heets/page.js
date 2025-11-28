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
  const title = "Стики Heets для IQOS — купить в Москве с доставкой по РФ";
  return {
    title,
    description:
      "Оригинальные стики Heets всех вкусов для IQOS. Москва. Всегда свежие партии, выгодные цены, доставка за 60 минут.",
    alternates: {
      canonical: `https://айкос-илюма.рф/products/heets`,
    },
    openGraph: {
      title: `Стики Heets для IQOS — купить в Москве с доставкой по РФ`,
      description: `Оригинальные стики Heets всех вкусов для IQOS. Москва. Всегда свежие партии, выгодные цены, доставка за 60 минут.`,
      url: `https://айкос-илюма.рф/products/heets`,
      images: [
        {
          url: `/favicon/web-app-manifest-512x512`,
          alt: `IqosIluma`,
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
      <h1 style={{ position: "absolute", zIndex: "-9999" }}>Стики Heets</h1>
      <ClientFilters items={items} />
    </div>
  );
}
