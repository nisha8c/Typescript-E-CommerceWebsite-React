import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductsData } from '../types/types';

export default function Home() {

  const [products, setProducts] = useState<ProductsData[]>([]);
  const [filter, setFilter] = useState(products);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:3000/api/products');
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

      <ul className='cards'>
        {filter.map((product) => {
          return (
                <li className='card' key={product.name.toString()}>
                  <div className='card-header'>
                    <Image src={product.picture.toString()} alt={product.name.toString()} width={200} height={200}/>
                  </div>
                  <h3>{product.name}</h3>
                  <div>
                    {product.description}
                  </div>
                  <div>
                    {product.price.toString()}
                  </div>
                  
                </li>
          );
        })}
        </ul>
    </>
  );
}
