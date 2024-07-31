import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentid } from "../Atom/atoms";
export function Addfuntion(){
    const navigate = useNavigate();
    const [current,setcurrent]= useRecoilState(currentid);
    const [par]=useSearchParams();
    const id = par.get('id')? par.get('id'):'';
    const sitename= par.get('sitename');
    const [Input,setInput]=useState('')
    function add(e){

        const fetch= async (e)=>{
            const result = await axios.post('http://localhost:3000/Add/'+sitename,{
                name:Input,
                uppertodo_id:id
            });
            console.log(result);
            if(result.data.message=="Done"){
                if(sitename=="Maintask"){navigate('/');
                }else{navigate('/'+sitename+'?id='+id);}
            }else{
                alert('didnt work');
            }
        }
        fetch(e);
    }
    return (<div className="w-full h-screen flex justify-center items-center bg-transparent">
        <div className="w-auto h-72 shadow-lg p-3 flex justify-center">
            <div><div className="font-dm-sans p-2 text-xl font-semibold text-indigo-600">Enter the name of the task?</div>
            <div className="flex font-dm-sans text-xl font-semibold text-indigo-600 "><input className="p-2 h-28 border-black" placeholder="Name" onChange={(e)=>{setInput(e.target.value);}}></input> 
            </div></div>
            <div className="flex pl-2 font-dm-sans text-xl font-semibold text-indigo-600"> <button className="bg-green-600 rounded-xl p-2" onClick={add}>Save</button></div>
        </div>

    </div>)
}