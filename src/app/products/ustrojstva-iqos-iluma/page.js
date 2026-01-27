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
  const title = "Оригинальные Айкос Илюма — все модели в наличии в Москве";

  return {
    title,
    description:
      "Продажа Айкос Илюма Prime, One и эксклюзивных серий. Сертифицированная продукция с гарантией и доставкой по Москве.",
    alternates: {
      canonical: `https://айкос-илюма.рф/products/ustrojstva-iqos-iluma`,
    },
    openGraph: {
      title,
      description:
        "Продажа Айкос Илюма Prime, One и эксклюзивных серий. Сертифицированная продукция с гарантией и доставкой по Москве.",
      url: `https://айкос-илюма.рф/products/ustrojstva-iqos-iluma`,
      images: [
        {
          url: `https://айкос-илюма.рф/favicon/web-app-manifest-512x512.png`,
          alt: `Айкос Илюма`,
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
      <h1 className="page-title">
        Оригинальные устройства IQOS ILUMA — купить в Москве
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
