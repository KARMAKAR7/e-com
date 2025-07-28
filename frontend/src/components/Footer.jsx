import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className='w-full sm:w-2/3 text-gray-800'>
                        Welcome to our e-commerce store! We offer a wide range of products to suit your needs. Shop with us for the best deals and quality service.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li className=''>Home</li>
                        <li>About Us</li>
                        <li>Delevery</li>
                        <li>Privicy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-456-7890</li>
                        <li>dummy@mail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright 2025@ forver.com -All Right Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
