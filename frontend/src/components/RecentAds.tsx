import AdCard, { AdCardProp } from "./AdCard";
import { useEffect, useState } from "react";
import 'dotenv/config';
import axios from "axios";


function RecentAds() {
    const [total, setTotal] = useState<number>(0);
    const [fetched, setFetched] = useState<AdCardProp[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`http://localhost:4000/ads`);
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
            <h2>Cute babies</h2>
            <p>Total of stars earned : {total} ⭐</p>
            <section className="recent-ads">
                {fetched.map((ad) => (
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
                ))}
            </section>
        </>
    );
}

export default RecentAds;