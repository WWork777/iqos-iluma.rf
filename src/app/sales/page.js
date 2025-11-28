import React from 'react'
import './style.scss'

export const metadata = {
    title: "Скидки и акции на Айкос Илюма и стики Terea в Москве",
    description: "Выгодные предложения на Айкос Илюма, Terea и аксессуары. Москва. Доставка и гарантия качества.",
    alternates: {
      canonical: `https://айкос-илюма.рф/sales`
    },
    openGraph: {
        title: `Скидки и акции на Айкос Илюма и стики Terea в Москве`,
        description: `Выгодные предложения на Айкос Илюма, Terea и аксессуары. Москва. Доставка и гарантия качества.`,
        url: `https://айкос-илюма.рф/sales`,
        images: [
            {
                url: `/favicon/web-app-manifest-512x512`,
                alt: `IqosIluma`,
            },
        ],
    },
  };

const Sales = () => {
    return (
        <div className="sales">
            <h1>Акции</h1> 
            <div className='sales-three'>
                <h3>Каждый 11-й блок стиков в подарок!</h3>
                <p>При покупке 10ти блоков - 11й в подарок</p>
            </div>
            
        </div>
    )
}

export default Sales