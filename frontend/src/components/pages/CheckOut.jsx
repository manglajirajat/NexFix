import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CheckOut(){
    const { cartId } = useParams();
    const [data,setData] = useState({});

    const fetchCart = async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/getCartViaId",
                {
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body : JSON.stringify({cartId})
                }
            )

            if(!response.ok){
                throw new Error("error during check out");
            }

            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart();
    },[])
    return(
        <div>
            <h1>Check Out</h1>
            <div className="flex items-center"> 
                <span>items : </span>
                {data.items?.map((item) => (
                    <div key={item._id} className="m-2 inline-block">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 inline-block">
                                <div className="h-20 w-20 bg-gray-100 inline-block">
                                    <img
                                        src={item.product.displayPicture || "/placeholder.svg"}
                                        alt={item.product.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                
                                <div className="p-4 inline-block">
                                    <div className="text-sm text-blue-600 mb-1">{item.product.category}</div>
                                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {item.product.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                                        <span className="text-sm text-gray-500 line-through mb-2">₹{item.product.price}</span>
                                    </div>
                                    <div>
                                        <span>Quantity : {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </div>

            <div>
                <h1>Total : {data.total}</h1>
                <h2>Choose payment </h2>
            </div>

        </div>
    )
}