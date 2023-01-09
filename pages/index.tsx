import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductsData } from '../types/types';

export default function Home() {

  const [products, setProducts] = useState<ProductsData[]>([]);
  const [filter, setFilter] = useState(products);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    getData();
  }, []);

  const filterProduct = (cat: string) => {
    const updatedList = () => products.filter((product) => product.category === cat);
    setFilter(updatedList);
  };

  return (
    <>
      <div className='buttons'>
          <button className='btn' type='submit' onClick={() => setFilter(products)}>All</button>
          <button className='btn' type='submit' onClick={() => filterProduct("mobiles")}>Mobiles</button>
          <button className='btn' type='submit' onClick={() => filterProduct("ear-phones")}>Ear Phones</button>
          <button className='btn' type='submit' onClick={() => filterProduct('mobile-case')}>Mobile Cases</button>
          <button className='btn' type='submit' onClick={() => filterProduct('charger')}>Chargers</button>
      </div>

      <div>
        {filter.map(product => (
          <div key={product.toString()}>
           
              <div>
                <h2 className="text-2xl py-5 capitalize">{product.category}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">

                    <div key={product.name.toString()} className="px-5 snap-start">
                    <div className="w-52">
                      <div className="bg-blue-100 p-5 rounded-xl">
                        <Image src={product.picture.toString()} alt="" width={200} height={200}/>
                      </div>

                      <div className="mt-2">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                      </div>

                      <p className="text-sm mt-1 leading-4 text-gray-500">{product.description}</p>

                      <div className="flex mt-1">
                        <div className="text-2xl font-bold grow">${product.price.toString()}</div>
                        <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">Add to Cart</button>
                      </div>

                    </div>
                    </div>
                  
                </div>
              </div>
            
          </div>
        ))}
      </div>
        
    </>
  );
}