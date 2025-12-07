import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();
	//const navigate = useNavigate();

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/products")
				.then((response) => {
					console.log(response.data);
					setProducts(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div
			className="w-full flex justify-center p-10 relative
      bg-gradient-to-b from-primary to-white text-secondary"
		>
			{loaded ? (
				<table
					className="w-full max-w-7xl table-auto border-separate border-spacing-0
        rounded-2xl overflow-hidden shadow-xl bg-white/70 
        "
				>
					<thead className="sticky top-0 z-10">
						<tr className="bg-secondary text-primary/95">
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Image
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Product ID
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Name
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Price
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Labelled Price
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Category
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Brand
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Model
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Stock
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Availability
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-secondary/10">
						{products.map((item, index) => {
							return (
								<tr
									key={index}
									className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
								>
									<td className="px-4 py-3 align-middle">
										<img
											src={item.images[0]}
											className="w-[38px] h-[38px] rounded-lg object-cover ring-1 ring-secondary/10 shadow-sm"
										/>
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{item.productID}
									</td>
									<td className="px-4 py-3 text-sm">{item.name}</td>
									<td className="px-4 py-3 text-sm font-semibold text-secondary">
										{item.price}
									</td>
									<td className="px-4 py-3 text-sm line-through decoration-gold/70 decoration-2">
										{item.labelledPrice}
									</td>
									<td className="px-4 py-3 text-sm">{item.category}</td>
									<td className="px-4 py-3 text-sm">{item.brand}</td>
									<td className="px-4 py-3 text-sm">{item.model}</td>
									<td className="px-4 py-3 text-sm font-medium">
										{item.stock}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-center">
										{item.isAvailable ? "Available" : "Unavailable"}
									</td>
									<td className="px-4 py-3 text-sm">
										{/* placeholder cell for future actions; styled for consistency */}
										<div className="inline-flex items-center gap-2 ">
											{/* <Link
											to="/admin/update-product"
											className="px-3 py-2 rounded-md w-[70px] text-center bg-accent/20 text-accent"
											state={item}
										>Edit</Link> */}
										<button
												onClick={() => {
													navigate("/admin/update-product", { state: item });
												}}
												className="px-3 py-2 rounded-md w-[70px] text-center bg-accent/20 text-accent hover:bg-accent/30 transition"
											>
												Edit
											</button>
									
											<ProductDeleteButton
											productID = {item.productID}
											reload={() => {
												setLoaded(false);
												}}/>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<Loader />
			)}

			<Link
				to="/admin/add-product"
				className="fixed right-[20px] bottom-[20px] w-[56px] h-[56px]
        flex justify-center items-center text-4xl rounded-full
        bg-accent text-primary shadow-2xl ring-2 ring-accent/30
        hover:scale-105 hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.35)]
        active:scale-95 transition-all"
			>
				<BiPlus />
			</Link>
		</div>
	);
}
