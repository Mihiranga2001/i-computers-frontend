import { Link } from "react-router-dom";
import { BiPhone, BiMailSend, BiMap } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsappSquare } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="w-full bg-accent/20 text-accent ">
            <div className="w-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-14">
                <div>
					<img src="/logo.png" alt="logo" className="h-[70px] mb-4" />
                    <p className="text-sm text-primary/80">
                        Your trusted computer shop for gaming PCs, laptops,
						accessories, and professional tech support. </p>
                </div>

                <div>
					<h3 className="text-lg font-semibold mb-4 py-4">Quick Links</h3>
					<ul className="space-y-2 text-sm">
						<li><Link to="/" className="hover:text-gold">Home</Link></li>
						<li><Link to="/products" className="hover:text-gold">Products</Link></li>
						<li><Link to="/about" className="hover:text-gold">About Us</Link></li>
						<li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
					</ul>
				</div>

                <div>
					<h3 className="text-lg font-semibold mb-4 py-4">Customer</h3>
					<ul className="space-y-2 text-sm">
						<li><Link to="/orders" className="hover:text-gold">My Orders</Link></li>
						<li><Link to="/cart" className="hover:text-gold">Cart</Link></li>
						<li><Link to="/login" className="hover:text-gold">Login</Link></li>
						<li><Link to="/register" className="hover:text-gold">Register</Link></li>
					</ul>
				</div>

                <div>
					<h3 className="text-lg font-semibold mb-4 py-4">Contact Us</h3>
					<div className="space-y-3 text-sm">
						<p className="flex items-center gap-2">
							<BiMap /> Jaffna, Sri Lanka
						</p>
						<p className="flex items-center gap-2">
							<BiPhone /> +94 77 123 4567
						</p>
						<p className="flex items-center gap-2">
							<BiMailSend /> support@icomputers.lk
						</p>
					</div>

                    <div className="flex gap-4 mt-5 text-xl">
						<a href="#" className="hover:text-gold"><FaFacebookF /></a>
						<a href="#" className="hover:text-gold"><FaInstagram /></a>
						<a href="#" className="hover:text-gold"><FaTwitter /></a>
                        <a href="#" className="hover:text-gold"><FaWhatsappSquare /></a>
					</div>
				</div>

            </div>
            <div className="w-full border-t border-accent/30 py-4 text-center text-sm text-accent">
				© {new Date().getFullYear()} iComputers. All rights reserved.
			</div>
        </footer>
			
	);
}
