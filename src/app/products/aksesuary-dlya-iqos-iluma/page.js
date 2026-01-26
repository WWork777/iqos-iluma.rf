export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://айкос-илюма.рф/api/products/getdevices", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title = "Оригинальные Айкос Илюма — все модели в наличии в Москве";
  return {
    title,
    description:
      "Продажа Айкос Илюма Prime, One и эксклюзивных серий. Сертифицированная продукция с гарантией и доставкой по Москве.",
    alternates: {
      canonical: `https://айкос-илюма.рф/products/aksesuary-dlya-iqos-iluma`,
    },
    openGraph: {
      title: `Оригинальные Айкос Илюма — все модели в наличии в Москве`,
      description: `Продажа Айкос Илюма Prime, One и эксклюзивных серий. Сертифицированная продукция с гарантией и доставкой по Москве.`,
      url: `https://айкос-илюма.рф/products/aksesuary-dlya-iqos-iluma`,
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
      <h1 className="page-title">
        Аксессуары для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
