
import React, { useEffect, useState } from 'react';
import { ProductsData } from '../types/types';
import Product from '../components/Product';

export default function Home() {

  const [products, setProducts] = useState<ProductsData[]>([]);
  const [filter, setFilter] = useState(products);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setFilter(data);
    };
    getData();
  }, []);

  const filterProduct = (cat: string) => {
    const updatedList = () => products.filter((product) => product.category === cat);
    setFilter(updatedList);
  };

  return (
    <section>
      <div className='buttons'>
          <h2 className="text-2xl py-5 capitalize p-2">Filter Products By Category</h2>
          <button className='btn' type='submit' onClick={() => setFilter(products)}>All</button>
          <button className='btn' type='submit' onClick={() => filterProduct("mobiles")}>Mobiles</button>
          <button className='btn' type='submit' onClick={() => filterProduct("ear-phones")}>Ear Phones</button>
          <button className='btn' type='submit' onClick={() => filterProduct('mobile-case')}>Mobile Cases</button>
          <button className='btn' type='submit' onClick={() => filterProduct('charger')}>Chargers</button>
      </div>

      <div className='products-container'>
        {filter.map(product => (
          <>      
            <div key={product.name.toString()} className="flex -mx-5">
              <div key={product.toString()} className="px-5 snap-start">
                <Product data={product}/>
              </div>
            </div> 
          </>
        ))}
      </div>
        
    </section>
  );
}
