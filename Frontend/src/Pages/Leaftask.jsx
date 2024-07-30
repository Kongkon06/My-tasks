import { useNavigate } from "react-router-dom"
//import { Todo } from "../Components/Todo" 
import { Todo } from "../Components/To";
import { useEffect, useState } from "react";
import { currentid, leafatom } from "../Atom/atoms";
import { useRecoilState } from "recoil";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Addbutton } from "../Components/Addbutton";
import { Goback } from "../Components/Goback";
import { Logo } from "../Components/Logo";
import Progressbar from "../Components/Progressbar";
export function Leaftask(){
    const [current,setcurrent]=useRecoilState(currentid);
    const [params] = useSearchParams();
    const id = params.get("id");
    const navigate=useNavigate();
    const [leafstate,setleaf]=useRecoilState(leafatom);
    const [prog,setprog] = useState(0);
    useEffect(()=>{
        const fetchData = async()=>{
            const result = await axios.post("http://localhost:3000/Data/Leaftask",{
                uppertodo_id:id
            });
            setleaf(result.data);
        }
        fetchData();
    },[]);
    useEffect(()=>{
        const val = leafstate.reduce((count, task) => (task.done ? count + 1 : count), 0);
            setprog(val / leafstate.length * 100);
            const check=async()=>{
                if(prog==100){const res=await axios.post('http://localhost:3000/Status/Subtask',{
                    uppertodo_id:id
                })}   
              }
              check();
            console.log(prog);
    },[leafstate]);
    function goback(){
        navigate('/subtask?id='+current);
    }
    function add(index){
        navigate('/Addpage?sitename=Leaftask'+'&id='+index);
    }
    async function fun(index){
        const res=await axios.post('http://localhost:3000/Status/Leaftask',{
            uppertodo_id:index
        })
        const updatedLeafState = leafstate.map(task =>
            task.id === index ? { ...task, done: res.data.msg } : task
          );
          setleaf(updatedLeafState);
          return;
        }
        async function del(index){
         await axios.post("http://localhost:3000/Delete/Leaftask",{
                uppertodo_id:index,
            });
            setleaf(leafstate.filter(obj=>obj.id !== index));
        }
    return <div>
        <div className='h-auto w-auto flex bg-indigo-600 items-center p-2 mb-5'><Goback fn={goback}/>
        <div className="pl-5"><Logo name='Leaftasks'/></div></div>
        <div className="flex justify-center items-center mb-10"> <Progressbar progress={prog}/></div>
        <div className="w-full h-full grid grid-cols-5">
        {leafstate.map((task, index) => (
                    <div key={index} className='col-span-1 flex justify-center items-center'>
                        <Todo name={task.leaftask} stat={task.done} id={task.id} fn={()=>{fun(task.id)}} del={()=>{del(task.id)}}/>
                    </div>
                ))}
                <div className='col-span-1 flex justify-center items-center'> <Addbutton fn={()=>{add(id)}}/></div>
    </div>
    </div>
}