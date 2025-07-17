import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler =()=>{
    event.preventDefault();
  }

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt odit aliquam vero sunt fugiat dolorem ad maxime veritatis explicabo, unde ex quibusdam excepturi voluptate rem quo vitae, necessitatibus iusto at.
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3" action="">
        <input type="email" name="email" id="" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
