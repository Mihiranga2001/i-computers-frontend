import axios from "axios";
import { useEffect, useState } from "react";
import ViewOrderInfo from "../components/viewOrderInfo";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
        const token = localStorage.getItem("token");
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
				.then((response) => {
					console.log(response.data);
					setOrders(response.data);
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
					<thead className="sticky top-0 ">
						<tr className="bg-secondary text-primary/95">
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Order ID
							</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Customer email
							</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Customer name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Actions
                            </th>
						</tr>
					</thead>

					<tbody className="divide-y divide-secondary/10">
						{orders.map((order, index) => {
							return (
								<tr
									key={index}
									className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
								>
								
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{order.orderId}
									</td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {order.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {order.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {order.status}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        LKR. {order.total.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
										<ViewOrderInfoCustomer order={order} />
                                    </td>
									
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<Loader />
			)}

		</div>
	);
}
