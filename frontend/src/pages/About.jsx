import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../component/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magnam natus nobis. Perferendis autem, itaque aut dolorem recusandae excepturi placeat aliquam atque est unde odio reprehenderit voluptatem necessitatibus quam harum.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis neque mollitia consequuntur dolore veritatis id, tempora nostrum eligendi quae eius. Eum officia error sint. Voluptatum molestiae distinctio ad eius commodi.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sit quod eum reprehenderit! Consequuntur temporibus excepturi amet quo qui explicabo omnis fugit ipsum modi voluptates vitae reprehenderit, quasi iusto nulla?</p>
        </div>
      </div>
      <div className='text-xl py-4 '>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio modi saepe veniam quia repudiandae facere voluptas amet aut corrupti et deserunt, quae eius molestias accusamus quos id delectus, exercitationem nemo!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio modi saepe veniam quia repudiandae facere voluptas amet aut corrupti et deserunt, quae eius molestias accusamus quos id delectus, exercitationem nemo!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio modi saepe veniam quia repudiandae facere voluptas amet aut corrupti et deserunt, quae eius molestias accusamus quos id delectus, exercitationem nemo!</p>
        </div>
      </div>
      
      <NewsletterBox/>
    </div>
  )
}

export default About
