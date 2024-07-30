import { useNavigate } from "react-router-dom"
import { Todo } from "../Components/To" 
import { useEffect,useContext, useState } from "react";
import { currentid, subatom } from "../Atom/atoms";
import { useRecoilState } from "recoil";
import { useSearchParams } from "react-router-dom";
import { Addbutton } from "../Components/Addbutton";
import axios from "axios";
import { Goback } from "../Components/Goback";
import { Logo } from "../Components/Logo";
import Progressbar from "../Components/Progressbar";
export function Subtask(){
    const [current ,setcurrent]= useRecoilState(currentid);
    const [params] = useSearchParams()
    const navigate=useNavigate();
    const [substate,setsub]=useRecoilState(subatom);
    const id = params.get("id");
    const [prog,setprog] = useState(0);
    function goback(){
        navigate('/')}
    useEffect(()=>{
        setcurrent(id);
        const fetchData = async () => {
            try {
                const result = await axios.post("http://localhost:3000/Data/Subtask",{
                    uppertodo_id:id,
                });
                setsub(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
  },[id]);
  useEffect(()=>{
    const val = substate.reduce((count, task) => (task.done ? count + 1 : count), 0);
    setprog(val / substate.length * 100);
    console.log(prog);
    const check=async()=>{
        if(prog==100){const res=await axios.post('http://localhost:3000/Status/Maintask',{
            uppertodo_id:id
        })}   
      }
      check();
  },[substate]);
  
  function add(index){
   navigate('/Addpage?sitename=Subtask'+'&id='+index);
  }
    function fun(index){
        navigate("/leaftask?id="+ substate[index].id );
    }
    async function del(index){
     await axios.post("http://localhost:3000/Delete/Subtask",{
            uppertodo_id:index ,
        });
        setsub(substate.filter(obj=>obj.id !== index));
    }
    return <div>
        <div className='h-auto w-auto flex bg-indigo-600 items-center p-2 mb-10'><Goback fn={goback
        }/><div className="pl-5"><Logo name='Subtasks'/></div></div>
        <div className="flex justify-center items-center mb-10"> <Progressbar progress={prog}/></div>
        <div className="w-full h-full grid grid-cols-5 gap-5">
        {substate.map((task, index) => (
          <div key={index} className="col-span-1 flex justify-center items-center">
            <Todo name={task.subtask} stat={task.done} id={task.id} fn={() => fun(index)} del={()=>{del(task.id)}}/>
                    </div>
                ))}
                <div className='col-span-1 flex justify-center items-center'> <Addbutton fn={()=>{add(id)}}/></div>
    </div>
    </div>
}