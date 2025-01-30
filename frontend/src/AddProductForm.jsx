import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        size: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        discount: "",
        displayPicture: null,
        images: []
    });

    const handleChange = (e) => {
        if (e.target.type === "file") {
            if (e.target.name === "displayPicture") {
                setFormData({ ...formData, displayPicture: e.target.files[0] });
            } else {
                setFormData({ ...formData, images: [...e.target.files] });
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "images") {
                formData.images.forEach((image) => data.append("images", image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch("http://localhost:3000/api/v1/product/register", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            navigate("/")

            toast.success("Product added successfully!");
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="px-2">
                <label className="block m-2">Enter product name:</label>
                <input type="text" name="name" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label className="block m-2">Enter product description:</label>
                <input type="text" name="description" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label>Enter size:</label>
                <input type="text" name="size" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label>Price:</label>
                <input type="number" name="price" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <p>Category:</p>
                <input type="radio" name="category" value="hardware" onChange={handleChange} /> Hardware
                <input type="radio" name="category" value="paints" onChange={handleChange} /> Paints
                <input type="radio" name="category" value="sanitary" onChange={handleChange} /> Sanitary

                <label className="block">Brand:</label>
                <input type="text" name="brand" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label>Stock:</label>
                <input type="number" name="stock" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label>Discount:</label>
                <input type="number" name="discount" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label className="block m-2">Display Picture:</label>
                <input type="file" name="displayPicture" onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <label>Images:</label>
                <input type="file" name="images" multiple onChange={handleChange} className="px-2 mx-2 rounded-md border-2 border-slate-200" />

                <button type="submit" className="bg-blue-200 block m-2 px-4 rounded-full">Submit</button>
            </form>
        </div>
    );
}