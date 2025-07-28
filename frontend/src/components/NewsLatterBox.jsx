import React from 'react'

function NewsLatterBox() {
  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-meduim text-gray-800'>
        Subscribe to our newsletter for the latest updates and offers!
      </p>
      <p className='text-gray-800 mt-3'>
        Stay informed about our latest products, exclusive deals, and special promotions.
        Enter your email below to join our mailing list.
      </p>
      <form onSubmit={onSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required />
        <button type='submit' className='bg-black text-white text-x5 px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLatterBox
