import { Await, useLoaderData } from "react-router-dom";
import { IProduct } from '../../interfaces/product.interface'
import { Suspense } from "react";

export function Product() {
  const data = useLoaderData() as { data: IProduct };

  return (
    <>
      <Suspense fallback={'Загружаю...'}>
        <Await 
        resolve={data.data}>
          {({ data }: { data: IProduct }) => ( 
            <>IProduct - {data.name}</>
            )}
        </Await>
      </Suspense>
    </>
  );
}


