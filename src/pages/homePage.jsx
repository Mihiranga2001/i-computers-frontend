import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import AboutPage from "./aboutPage";
import Home from "./homeContent";
import ContactPage from "./contactPage";
import Footer from "../components/footer";

export default function HomePage(){

    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)]">
                <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/products" element={<ProductPage />}/>
                <Route path="/about" element={<AboutPage />}/>
                <Route path="/contact" element={<ContactPage />}/>
                <Route path="/overview/:productID" element={<ProductOverview/>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/*" element={<h1>page not found</h1>}/>
            </Routes>
               
        </div>
        <Footer />
        </div>
    )
}