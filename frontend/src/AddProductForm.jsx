export default function AddProductForm(){
    return(
        <div>
            <form action="http://localhost:3000/api/v1/product/register" method="POST" encType="multipart/form-data" className="px-2">
                <label htmlFor="name" className="block m-2">Enter product name : </label>
                <input type="text" name="name" id="name" placeholder="enter name" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <label htmlFor="description" className="block m-2">Enter product description : </label>
                <input type="text" name="description" id="description" placeholder="enter description" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>
            
                <label htmlFor="size">Enter size : </label>
                <input type="text" name="size" id="size" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <label htmlFor="price">Price : </label>
                <input type="number" name="price" id="price" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <p>category : </p>
                <input type="radio" name="category" id="hardware" value="hardware"/>
                <label htmlFor="hardware">Hardware</label>
                <input type="radio" name="category" id="paints" value="paints"/>
                <label htmlFor="paints">Paints</label>
                <input type="radio" name="category" id="sanitary" value="sanitary"/>
                <label htmlFor="sanitary">Sanitary</label>

                <label htmlFor="brand" className="block">Brand : </label>
                <input type="text" name="brand" id="brand" placeholder="add brand" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <label htmlFor="stock">Stock : </label>
                <input type="number" name="stock" id="stock" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <label htmlFor="discount">Discount : </label>
                <input type="number" name="discount" id="discount" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <label htmlFor="displayPicture" className="block m-2">Display Picture : </label>
                <input type="file" name="displayPicture" id="displayPicture" className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <label htmlFor="images" className="">Images : </label>
                <input type="file" name="images" id="images" multiple className="px-2 mx-2 rounded-md border-2 border-slate-200"/>

                <button type="submit" className="bg-blue-200 block m-2 px-4 rounded-full">Submit</button>
            </form>
        </div>
    )
}