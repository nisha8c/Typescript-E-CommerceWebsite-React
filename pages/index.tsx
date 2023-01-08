import Image from 'next/image';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='p-5'>
        <div>
          <h2 className='text-2xl'>Mobiles</h2>
          <div className='py-4'>
            <div className='w-64'>
              <div className='bg-blue-100 p-5 rounded-xl'>
                <Image src='/products/Mobile-Phone.png' alt='mobile' width={200} height={200}></Image>
              </div>
              <div className='mt-2'>
                <h3 className='font-bold text-lg'>Phone 1</h3>
              </div>
              <p className='text-sm mt-1 leading-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, magni. Sapiente nisi necessitatibus enim temporibus dolores cum in iusto, nulla quaerat commodi ipsam quos placeat ipsum fugit quae fuga possimus.</p>
              <div className='flex mt-1'>
                <div className='text-2xl font-bold grow'>$999</div>
                <button className='bg-emerald-400 text-white py-1 px-3 rounded-xl'>Buy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
