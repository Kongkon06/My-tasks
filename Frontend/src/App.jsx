
import './App.css'
import React from 'react';
import { Maintask } from './Pages/Maintask';
import { Subtask } from './Pages/Subtask'; 
import { Leaftask } from './Pages/Leaftask';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { Addfuntion } from './Pages/Addpage';

function App() {
   return <div>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Maintask/>}/>
     <Route path="/Subtask" element={<Subtask/>}/>
     <Route path="/Leaftask" element={<Leaftask/>}/>
     <Route path="/Addpage" element={<Addfuntion/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
