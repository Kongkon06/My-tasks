import { atom, atomFamily } from 'recoil'
 export const mainatom = atom({
    key:'mainatom',
    default:[{}]
 }); 
 export const subatom= atom({
    key:'subatom',
    default:[{}]
 });
 export const leafatom= atom({
    key:'leafatom',
    default:[{}]
 });
 export const currentid= atom({
   key:'currentid',
   default:0
 })
 export const currentsite = atom({
   key:'currentsite',
   default:''
 })
 export const task_com = atomFamily({
   key:'task_com',
   default:false
 })