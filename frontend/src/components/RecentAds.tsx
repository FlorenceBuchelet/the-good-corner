import { log } from "console";
import AdCard, { AdCardProp } from "./AdCard";
import { useState } from "react";


function RecentAds() {
    const [total, setTotal] = useState(0);

    const ads: AdCardProp[] = [
        {
            imgUrl: "/images/table.webp",
            link: "/ads/1",
            price: 120,
            title: "table",
        }, {
            imgUrl: "/images/dame-jeanne.webp",
            link: "/ads/2",
            price: 75,
            title: "Dame Jeanne",
        }, {
            imgUrl: "/images/vide-poche.webp",
            link: "/ads/3",
            price: 4,
            title: "Vide poche",
        }, {
            imgUrl: "/images/vaisselier.webp",
            link: "/ads/4",
            price: 900,
            title: "Vaisselier",
        }, {
            imgUrl: "/images/bougie.webp",
            link: "/ads/5",
            price: 8,
            title: "Bougie",
        }, {
            imgUrl: "/images/porte-magazine.webp",
            link: "/ads/6",
            price: 45,
            title: "Porte Magazine",
        }
    ];
    return (
        <>
            <h2>Annonces récentes</h2>
            <p>Prix total : {total} €</p>
            <section className="recent-ads">
                {ads.map((ad, index) => (
                    <article
                        key={ad.title}
                    >
                        <AdCard
                            imgUrl={ad.imgUrl}
                            link={ad.link}
                            price={ad.price}
                            title={ad.title}
                        />
                        <button
                            className="button"
                            onClick={() => setTotal(total + ad.price)}
                        >
                            Add price to total
                        </button>
                    </article>
                ))}
            </section>
        </>
    );
}

export default RecentAds;