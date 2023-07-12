import React, {useState, useEffect} from 'react';

import useFetch from '../../hooks'

function Products() {
    const {data} = useFetch();

  
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div></div>
  )
}

export default Products