import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../constant";

export default function AddProductForm() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        size: "",
        price: "",
        category: "",
        subCategory: "",
        brand: "",
        stock: "",
        discount: "",
        badge : "",
        featured : false,
        displayPicture: null,
        images: [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
    // Define subcategories for each category
    const subCategories = {
        Hardware: ["Safety & Security", "Hand Tools", "Fastenrs", "Electrical Supplies", "Door Hardware"],
        Paint: ["Exterior", "Interior", "Enamel", "Primer","Paint Tools","Distemper"],
        Sanitary: ["Bathroom Fixtures", "Toliets & Bidets", "Bathroom Accessories", "Plumbing", "Solvent"],
    };

    const handleChange = (e) => {
        if (e.target.type === "file") {
            if (e.target.name === "displayPicture") {
                setFormData({ ...formData, displayPicture: e.target.files[0] });
            } else {
                setFormData({ ...formData, images: [...e.target.files] });
            }
        } else if (e.target.type === "checkbox") {
            setFormData({ ...formData, [e.target.name]: e.target.checked});
        }  else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "images") {
                formData.images.forEach((image) => data.append("images", image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch(`${backendUrl}/api/v1/product/register`, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            toast.success("Product added successfully!");
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to add product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const checkAuthStatus = async () => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`${backendUrl}/api/v1/user/me`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
      
            if (!response.ok) {
              throw new Error("Session expired. Please log in again.");
            }
      
            const result = await response.json();
            setUserType(result.data.userType);
        } catch (error) {
            console.log(error);  
        }
    };

    useEffect(() => {
        checkAuthStatus();
    },[]);

    if(userType !== "admin"){
        return(
            <div>
                not authorized to view this page
            </div>
        )
    }

    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 px-40">
                {/* Name */}
                <div>
                    <label className="block mb-1">Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1">Product Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter description"
                        required
                    />
                </div>

                {/* Size */}
                <div>
                    <label className="block mb-1">Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter size"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter price"
                        required
                    />
                </div>

                <div className="flex justify-between">
                    {/* Category */}
                    <div>
                        <label className="block mb-1">Category:</label>
                        <div className="space-x-2 inline-block">
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Hardware"
                                    onChange={handleChange}
                                    required
                                />{" "}
                                Hardware
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Paint"
                                    onChange={handleChange}
                                />{" "}
                                Paint
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Sanitary"
                                    onChange={handleChange}
                                />{" "}
                                Sanitary
                            </label>
                        </div>
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label className="mb-1">Subcategory:</label>
                        <select
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleChange}
                            className="w-full px-2 py-1 rounded-md border-2 border-slate-200 disabled:opacity-50"
                            required
                            disabled={!formData.category} // Disable if no category is selected
                        >
                            <option value="">Select Subcategory</option>
                            {formData.category && subCategories[formData.category].map((subCat) => (
                                <option value={subCat.replace(" ","-")} key={subCat}>
                                    {subCat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Brand */}
                <div>
                    <label className="block mb-1">Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter brand"
                        required
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block mb-1">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter stock"
                        required
                    />
                </div>

                {/* Discount */}
                <div>
                    <label className="block mb-1">Discount:</label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter discount"
                        required
                    />
                </div>

                {/* Badge */}
                <div>
                    <label className="block mb-1">Badge :</label>
                    <input
                        type="text"
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        placeholder="Enter Badge"
                    />
                </div>

                {/* Featured */}
                <div>
                    <label className="mb-1 mr-2">Featured :</label>
                    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                </div>

                {/* Display Picture */}
                <div>
                    <label className="block mb-1">Display Picture:</label>
                    <input
                        type="file"
                        name="displayPicture"
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                        required
                    />
                </div>

                {/* Images */}
                <div>
                    <label className="block mb-1">Product Images:</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleChange}
                        className="w-full px-2 py-1 rounded-md border-2 border-slate-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}