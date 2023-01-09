import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 bg-white p-5 w-full'>
        <Link href={'/'}>Home</Link>
        <Link href={'/checkout'}>Cart 0</Link>
    </header>
  )
}

export default Header