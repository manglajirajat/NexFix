import { useEffect, useState } from "react"
export default function HandToolPage() {
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(
              "http://localhost:3000/api/v1/product/get?subCategory=Hand Tools",
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
  },[]);

  return(
    <div>
      <h1>Hand Tools Products</h1>
        <div className="bg-red-200">
            {data.length > 0 ? (
              <ul>
                {data.map((product) => (
                  <li key={product._id}>
                    <img src={product.displayPicture} alt="" className="w-80"/>
                      id = {product._id} name : {product.name} MRP : <span className="line-through decoration-2">${product.price}</span> price : {product.netPrice}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}
        </div>
    </div>
  )
}