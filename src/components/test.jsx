import { useState } from "react";

export default function Test(){

    const[count,setCount] = useState(0);
    
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center">
                <button onClick ={
                    ()=>{
                        setCount(count-1)

                    }} className="h-[30px] w-[30-px] bg-red-500 text-white">
                    Decrement
                </button>
                <h1 className="h-[50px] w-[50px] text-center"> {count}</h1>

                <button onClick ={
                    ()=>{
                        setCount(count+1)

                    }}  className="h-[30px] w-[30-px] bg-red-500 text-white">
                    Increment
                </button>
        </div>
        </div>

    )
}