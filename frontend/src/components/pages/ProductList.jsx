import { useEffect, useState } from "react"

export default function ProductList({category = "", subCategory = ""}){
    const [data,setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                
                const response = await fetch(`http://localhost:3000/api/v1/product/get?category=${category}&subCategory=${subCategory}`,
                    {
                        method : "GET"
                    }
                );

                if(!response.ok){
                    throw new Error("failed to fetch products")
                }

                const result = await response.json();

                setData(result.data);
            } catch(error) {
                console.log(error);
            }
        }

        fetchData();
    },[category,subCategory]);

    return(
        <div>
        <h1>{category ? (category) : (subCategory)} Products</h1>
          <div className="bg-red-200">
              {data.length > 0 ? (
                <ul>
                  {data.map((product) => (
                    <li key={product._id}>
                      <img src={product.displayPicture} alt="" className="w-80"/>
                        id = {product._id} name : {product.name} MRP : <span className="line-through decoration-2">${product.price}</span> price : {product.netPrice}
                        <p>category = {product.category} subCategory = {product.subCategory}</p>
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