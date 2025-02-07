import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProductList(){
    const [data,setData] = useState([]);
    const {category,subCategory} = useParams();

    const fetchCategoryData = async(category) => {
      try{
          
          const response = await fetch(`http://localhost:3000/api/v1/product/getCategory/${category}`,
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

  const fetchSubcatData = async(subCategory) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/product/getSubcategory/${subCategory}`,
        {
          method : "GET"
        }
      );
      
      if(!response.ok){
        throw new Error("failed to fetch");
      }

      const result = await response.json();

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }
    
    useEffect(() => {
        if(subCategory){
          fetchSubcatData(subCategory);
          return;
        }
        
        if(category){
          fetchCategoryData(category);
          return;
        }
    },[]);

    return(
        <div>
        <h1>{category ? (category) : ("")} Products</h1>
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