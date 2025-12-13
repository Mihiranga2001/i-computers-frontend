import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/AdminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage(){
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            window.location.href = "/";
            return;
        }
        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            if(response.data.role == "admin"){
                setUser(response.data);
            }else{
                window.location.href = "/";
            }
        }).catch(()=>{
            window.location.href = "/login";
        })
    },[])

    return(
       <div className="w-full h-full flex bg-accent">
        {user ?
        <>
            <div className="w-[300px] bg-accent h-full">

                <div className="w-full h-[100px] flex items-center text-primary ">
                    <img src="/logo.png" className="h-full"/>
                    <h1 className="text-2xl">Admin</h1>
                </div>
                <div className="w-full h-[400px] text-white text-2xl flex flex-col pl-[20px] pt-[20px]">

                    <Link to="/admin" className="w-full flex items-center h-[50px] gap-[10px]"> <LuClipboardList />Orders</Link>
                    <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-[10px]"> <LuBoxes />Products</Link>
                    <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-[10px]"><FiUsers/>Users</Link>
                    <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-[10px]"><MdOutlineRateReview />Reviews</Link>
                    
                    </div>
            </div>
            <div className="w-[calc(100%-300px)] h-full max-h-full bg-primary border-[10px] border-accent rounded-3xl overflow-y-scroll ">
            <Routes>
                <Route path="/" element={<AdminOrdersPage />}/>
                <Route path="/products" element={<AdminProductsPage />}/>
                <Route path="/add-product" element={<AdminAddProductPage />}/>
                <Route path="/update-product" element={<AdminUpdateProductPage />} />
                <Route path="/users" element={<AdminUsersPage/>}/>
                <Route path="/reviews" element={<h1>Reviews</h1>}/>
            </Routes>
            </div>
            </>:
            <Loader/>
        }
            </div>

    );
}