import React from 'react'

const Logout = () => {
  return (
    <div className='fixed top-3 right-3'>
      <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}
       className="bg-red-500 text-white p-2 rounded-lg">Logout</button>
      
    </div>
  )
}

export default Logout
