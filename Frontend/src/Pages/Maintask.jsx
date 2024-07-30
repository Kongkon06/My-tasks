import { Todo } from '../Components/Todo';
import { Addbutton } from '../Components/Addbutton';
import { Logo } from '../Components/Logo';
import { useNavigate } from 'react-router-dom';
import { mainatom } from '../Atom/atoms'
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Progressbar from '../Components/Progressbar';
export function Maintask(){
    const navigate= useNavigate();
    const [mainstate,setmain]=useRecoilState(mainatom);
    const [prog ,setprog] = useState(0);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/Data/Maintask");
                setmain(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
  },[mainstate]);
  useEffect(()=>{
    const val = mainstate.reduce((count, task) => (task.done ? count + 1 : count), 0);
    setprog(val / mainstate.length * 100);
    
  },[mainstate])
    function add(){
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/Add/Maintask");
                setmain(result.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            fetchData();
        };
    };
    function fun(index){
     navigate('/subtask?id='+mainstate[index].id);
    }
    function add(){
        navigate('/Addpage?sitename=Maintask');
    }
    async function del(index){
        await axios.post("http://localhost:3000/Delete/Maintask",{
            uppertodo_id:index ,
        });
        setmain(mainstate.filter(obj=>obj.id !== index));
    }
    return <div>
        <div className='h-auto w-auto bg-indigo-600 flex justify-center items-center p-2 mb-10'><Logo name='My Tasks'/></div>
        <div className="flex justify-center items-center mb-10"> <Progressbar progress={prog}/></div>
         <div className='w-full h-full  grid grid-cols-5 gap-5 '>
         {mainstate.map((task, index) => (
                    <div key={index} className='col-span-1 flex justify-center items-center mb-5'>
                        <Todo name={task.task} stat={task.done} id={task.id} fn={() => fun(index)} del={()=>{del(task.id)}} />
                    </div>
                ))}
             <div className='col-span-1 flex justify-center items-center'> <Addbutton fn={add}/></div>
        </div> 
    </div>
}