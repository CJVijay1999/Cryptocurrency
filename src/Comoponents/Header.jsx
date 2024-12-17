import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='content p-4 bg-slate-800 sticky top-0 z-50 flex justify-between items-center'>
          <h1 className="text-[50px] text-white font-bold font-sans ml-10">
            Crypto
          </h1>

          <div className='links flex justify-center items-center gap-[50px] text-white font-bold font-sans ml-10 text-2xl'>
            <Link className='hover:scale-105 hover:underline cursor-pointer' to="/">Coins</Link>
            <Link className='hover:scale-105 hover:underline cursor-pointer' to="/exchange">Exchange</Link>
          </div>
    </div>
  )
}

export default Header