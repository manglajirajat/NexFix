import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product(){
    const [productDetail,setProductDetail] = useState(null);
    const { productId } = useParams();

    const getProductDetail = async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/v1/product/getProductDetail/${productId}`,
                {
                    method: "GET",
                }
            )

            if(!response.ok){
                throw new Error("Product not found");
            }

            const result = await response.json();
            setProductDetail(result.data);
        } catch (error) {
            console.log("Product not found:", error);
        }
    }

    useEffect(()=>{
        getProductDetail();
    })
    return(
        <div className="text-center">
            {productDetail && (
                <div>
                    <div className="w-80 m-auto">
                        <img src={productDetail.displayPicture} alt={productDetail.name} />
                    </div>
                    <div>
                        <h1>name : {productDetail.name}</h1>
                        <p>description : {productDetail.description}</p>
                        <p>category : {productDetail.category}</p>
                        <p>netPrice : {productDetail.netPrice}</p>
                        <p>price : {productDetail.price}</p>
                    </div>
                </div>
            )}
        </div>
    )
}