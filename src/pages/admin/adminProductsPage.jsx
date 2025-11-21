import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

export default function AdminProductsPage(){
    return(
        <div className="w-full flex justify-center p-10 relative bg-gradient-to-b from-primary to-white text-secondary">
            product page
            <Link to="/admin/add-product"
				className="fixed right-[20px] bottom-[20px] w-[56px] h-[56px] flex justify-center items-center text-4xl border-[2px] rounded-full  hover:text-white hover:bg-accent text-accent border-accent">
				<BiPlus />
			</Link>
        </div>
    )
}