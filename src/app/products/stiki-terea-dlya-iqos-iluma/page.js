export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function fetchItems() {
  const baseUrl =
    process.env.NODE_ENV === "production" && typeof window === "undefined"
      ? "http://localhost:3004"
      : "";

  try {
    return await safeFetch(`${baseUrl}/api/products/getterea`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch error for terea sticks:", error.message);
    throw new Error("Ошибка загрузки товаров");
  }
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
      title,
      description:
        "Большой выбор вкусов стиков Terea. Только свежие партии. Быстрая доставка и выгодные цены в Москве.",
      url: `https://айкос-илюма.рф/products/stiki-terea-dlya-iqos-iluma`,
      images: [
        {
          url: `https://айкос-илюма.рф/favicon/web-app-manifest-512x512.png`,
          alt: `Стики Terea`,
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
    console.error("Page fetch error:", error);
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Ошибка загрузки</h1>
        <p>Не удалось загрузить список стиков Terea.</p>
        <a href="/" style={{ color: "blue" }}>
          На главную
        </a>
      </div>
    );
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
