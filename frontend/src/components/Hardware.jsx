import { useEffect, useState } from "react";

export default function Hardware() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/v1/product/get?category=hardware",
                    {
                        method: "GET",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();

                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    });

    return (
        <div>
            <h1>Hardware Products</h1>
            <div className="bg-red-200">
                {data.length > 0 ? (
                    <ul>
                        {data.map((product) => (
                            <li key={product._id}>
                                <img src={product.displayPicture} alt="" className="w-80"/>
                                id = {product._id} name : {product.name} price : {product.netPrice}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}