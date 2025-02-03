import { useEffect, useState } from "react"
export default function HardwarePage() {
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(
              "http://localhost:3000/api/v1/product/get?category=Hardware",
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

  const addInCart = async (product,price) => {
    const qty = 1;
    const response = await fetch("http://localhost:3000/api/v1/cart/addInCart",
      {method : "POST",body:{product,price,qty}}
    )

    if(!response.ok){
      throw new Error("error adding product")
    }

    console.log("added");
  }

  return(
    <div>
      <h1>Hardware Products</h1>
        <div className="bg-red-200">
            {data.length > 0 ? (
              <ul>
                {data.map((product) => (
                  <li key={product._id}>
                    <img src={product.displayPicture} alt="" className="w-80"/>
                      id = {product._id} name : {product.name} 
                      MRP : <span className="line-through decoration-2">${product.price}</span> 
                      price : {product.netPrice}
                      <button className="bg-blue-500 text-white rounded-full block px-2 m-2 hover:bg-blue-600" 
                      onClick={() => {
                        addInCart(product._id,product.price)}}>Add to cart</button>
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