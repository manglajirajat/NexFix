import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Product(){
    const [productDetail,setProductDetail] = useState(null);
    const { productId } = useParams();
    const [reviewData,setReviewData] = useState({
        rating: 0,
        comment: "",
    })

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

    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value,
        });
    }

    const handelSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch(`http://localhost:3000/api/v1/review/addReview`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({productId : productId , ...reviewData}),
                }
            )

            if(!response.ok){
                throw new Error("something went wrong");
            }

            toast.success("added successfully");
            setReviewData({
                rating: 0,
                comment: "",
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getProductDetail();
    })

    return(
        <div className="text-center">
            {productDetail && (
                <div>
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="w-80 m-auto">
                            <img src={productDetail.displayPicture} alt={productDetail.name} />
                        </div>
                        <div>
                            <h1>name : {productDetail.name}</h1>
                            <p>description : {productDetail.description}</p>
                            <p>category : {productDetail.category}</p>
                            <p>netPrice : {productDetail.netPrice}</p>
                            <p>price : {productDetail.price}</p>
                            <button className="bg-yellow-400 font-bold p-2 m-2">add to cart</button>
                            <button className="bg-yellow-400 font-bold p-2 m-2">buy now</button>
                        </div>
                    </div>
                    <div className="m-6 bg-blue-200">
                        <div>
                            <p>related products</p>
                            <div>
                                products here
                            </div>
                        </div>
                        <div>
                            <p>more you like</p>
                            <div>
                                liked products here
                            </div>
                        </div>
                    </div>
                    <div className="m-6 bg-red-200">
                        <p className="font-bold">rating : {productDetail.rating}</p>
                        <p>reviews </p>
                        <form onSubmit={handelSubmit}>
                            <input type="number" max={5} name="rating" value={reviewData.rating} onChange={handleChange} className="border" required/>
                            <input type="text" name="comment" onChange={handleChange} value={reviewData.comment} className="border" required/>
                            <button className="">submit</button>
                        </form>
                        {productDetail.reviews.map((review,index)=>(
                            <div key={index}>
                                <p>rating : {review.rating}</p>
                                <p>comment : {review.comment}</p>
                                <p>by : {review.userId.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}