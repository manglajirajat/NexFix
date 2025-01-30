import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <nav className="flex bg-red-100 justify-between">
            <ul className="flex pl-4">
                <li className="p-4 font-bold"><Link to={'/'}>NexFix</Link></li>
                <Link to={'/'}><li className="p-4 hover:border-b-2 border-black">Home</li></Link>
                <Link to={'/hardware'}><li className="p-4 hover:border-b-2 border-black">Hardware</li></Link>
                <Link to='/paints'><li className="p-4 hover:border-b-2 border-black">Paints</li></Link>
                <Link to={'/saintary'}><li className="p-4 hover:border-b-2 border-black">Sanitary</li></Link>
            </ul>

            <ul className="flex pr-4">
                <input type="text" placeholder="search for brands/product" className="bg-white m-4 rounded-full p-1 px-4 text-sm w-80"/>
                <Link to={'/profile'}><li className="p-4">profile</li></Link>
                <li className="p-4">cart</li>
                <Link to={'/addProduct'}><li className="p-4 hover:border-b-2 border-black">Add product</li></Link>
            </ul>
        </nav>
    )
}