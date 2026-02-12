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
    return await safeFetch(`${baseUrl}/api/products/getiqos`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch error for iqos devices:", error.message);
    throw new Error("Ошибка загрузки товаров");
  }
}

export async function generateMetadata() {
  const title = "Купить устройства IQOS ILUMA Мсоква";

  return {
    title,
    description:
      "Каталог устройств IQOS ILUMA с доставкой по Москве. Лучший выбор вкусов и брендов!",
    alternates: {
      canonical: `https://айкос-илюма.рф/products/iqosexclusive`,
    },
    openGraph: {
      title: "Купить устройства IQOS ILUMA в TereaIqos с доставкой по Москве",
      description:
        "Каталог лимитированных устройств IQOS ILUMA с доставкой по всей России. Лучший выбор вкусов и брендов!",
      url: `https://айкос-илюма.рф/products/iqosexclusive`,
      images: [
        {
          url: `https://айкос-илюма.рф/favicon/web-app-manifest-512x512.png`,
          alt: `Устройства IQOS ILUMA`,
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
        <p>Не удалось загрузить список устройств.</p>
        <a href="/" style={{ color: "blue" }}>
          На главную
        </a>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="page-title" style={{ marginBottom: "2rem" }}>
        Лимитированные устройства IQOS ILUMA с доставкой
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
