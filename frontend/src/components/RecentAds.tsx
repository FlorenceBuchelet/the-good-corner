import AdCard, { AdCardProp } from "./AdCard";
import { useEffect, useState } from "react";
import axios from "axios";


function RecentAds() {
    const [total, setTotal] = useState<number>(0);
    const [fetched, setFetched] = useState<AdCardProp[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:4000/ads/all");
                const fetchedData: AdCardProp[] = await result.json();
                setFetched(fetchedData);

            //    const { data } = await axios.get<AdCardProp[]>("http://localhost:4000/ads");
            //    console.log("axios", data); 
            } catch (err) {
                console.error("Error during data fetching:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <h2>Annonces récentes</h2>
            <p>Prix total : {total} €</p>
            <section className="recent-ads">
                {fetched.map((ad) => (
                    <article
                        key={ad.title}
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
                            Add price to total
                        </button>
                    </article>
                ))}
            </section>
        </>
    );
}

export default RecentAds;