export function Addbutton({fn}){
    return <div>
        <div className="rounded-full shadow-black shadow-lg bg-slate-200" role="button" onClick={fn}>
        <svg className="w-44 h-44 mr-2" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
    </div>
}
