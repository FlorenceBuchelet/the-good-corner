import { useState } from "react";
import { useRouter } from "next/router";
import AdCard, { AdCardProp } from "@/components/AdCard";
import { useQuery } from "@apollo/client";
import { GET_ONE_CATEGORY } from "@/graphQL/categories";

function CategoryId() {

    const [total, setTotal] = useState<number>(0);
    const router = useRouter();
    const id = parseFloat(router.query.id as string)

    const { data, loading, error } = useQuery(GET_ONE_CATEGORY, {
        variables: { getCategoryByIdId: id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h2>Cute babies</h2>
            <p>Total of stars earned : {total} ⭐</p>
            <section className="recent-ads">
                {data.getCategoryById.ads.map((ad: AdCardProp) => {
                    return (
                        <article
                            key={ad.id}
                        >
                            <AdCard
                                picture={ad.picture}
                                id={ad.id}
                                stars={ad.stars}
                                title={ad.title}
                            />
                            <button
                                className="button"
                                onClick={() => setTotal(total + ad.stars)}
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