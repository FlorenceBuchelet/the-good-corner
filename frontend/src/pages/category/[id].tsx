import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdCard, { AdCardProp } from "@/components/AdCard";


function CategoryId() {
    const [total, setTotal] = useState<number>(0);
    const [ads, setAds] = useState<AdCardProp[]>([])
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchAds = async () => {
                try {
                    const result = await fetch(`http://localhost:4000/ads?category=${id}`);
                    const data = await result.json();
                    setAds(data);

                } catch (err) {
                    console.error("Error in fetching filtered (categories) ads: ", err);
                }
            }
            fetchAds();
        }
    }, [id]);

    return (
        <>
            <h2>Cute babies</h2>
            <p>Total of stars earned : {total} ⭐</p>
            <section className="recent-ads">
                {ads.map((ad) => {
                    return (
                        <article
                            key={ad.id}
                        >
                            <AdCard
                                picture={ad.picture}
                                id={ad.id}
                                price={ad.price}
                                title={ad.title}
                            />
                            <button
                                className="button"
                                onClick={() => setTotal(total + ad.price)}
                            >
                                Add stars to total
                            </button>
                        </article>
                    )
                })}
            </section>

        </>
    );
}

export default CategoryId;