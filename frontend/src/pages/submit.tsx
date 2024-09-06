import { useState, useEffect, SyntheticEvent } from "react";
import { Category } from "@/components/Header";
import axios from "axios";

interface formProp {
    author: string;
    category: number;
    city: string;
    description: string;
    picture: string;
    stars: number;
    title: string;
}

function Submit() {
    const [categories, setCategories] = useState<Category[]>([])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();


        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("createdAt", Date());
        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson);
        try {
            await axios.post("http://localhost:4000/ads", formJson);
            console.log("probably ok");

        } catch (err) {
            console.error("error adding an ad: ", err);

        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetch(`http://localhost:4000/categories`);
                const data: Category[] = await result.json();
                setCategories(data);
                //                const resultTag = await fetch(`http://localhost:4000/tags`);
                //                const dataTag: Tag[] = await result.json();
                //                setTags(dataTag);
            } catch (err) {
                console.error("Error in categories or Tags fetching: ", err);
            }
        }
        fetchCategories();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Ajouter un nouveau produit</h1>
            <form className="form" onSubmit={handleSubmit}>
                <>
                    <label>Titre:</label>
                    <input type="text" name="title" required />
                    <label>Description:</label>
                    <textarea name="description" ></textarea>
                </>
                <>
                    <label>Auteur:</label>
                    <input type="text" name="author" required />
                </>
                <>
                    <label>Prix:</label>
                    <input type="number" name="stars" />
                </>
                <>
                    <label>Image:</label>
                    <input type="text" name="picture" />
                </>
                <>
                    <label>Ville:</label>
                    <input type="text" name="city" />
                </>
                <>
                    <label>Catégorie:</label>
                    <select name="category" >
                        {categories.map((cat) => (
                            <option value={cat.id} key={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </>
                {/*             <>
                <label>Tags:</label>
                <input type="text" name="tags" placeholder="Séparés par des virgules" />
                </> */}
                <button type="submit">Soumettre</button>
            </form>
        </>
    );
}

export default Submit;