import { useRouter } from 'next/router';
import React from 'react';



export default function Home() {

  const routeur = useRouter();

  return (
    <>
      <div className="bg-base-100"  style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: '91vh'}}>
        <button style={{marginRight: '10px'}} className="btn" onClick={() => {routeur.push("/visiteur"); } }>visiteur</button>
        <button className='btn' onClick={() => {routeur.push("/admin"); } }>Admin</button>
      </div>
    </>
  )
}