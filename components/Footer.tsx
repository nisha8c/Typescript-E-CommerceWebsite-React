import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer className='sticky bottom-0 bg-white p-5 w-full flex border-t border-gray-200 justify-center space-x-12'>
      <div>
      <SocialIcon className='m-1 p-1' url="https://github.com/nisha8c" style={{ height: 35, width: 35 }}/>
      <SocialIcon className='m-1 p-1' url="https://www.linkedin.com/in/nisha-c-a15b59220/" style={{ height: 35, width: 35 }}/>
      <SocialIcon className='m-1 p-1' url="https://www.facebook.com/dhchnsh17/" style={{ height: 35, width: 35 }}/>
      </div>
    </footer>
  )
}

export default Footer;