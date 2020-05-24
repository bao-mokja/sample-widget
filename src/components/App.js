import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './Main';


export default function App({ initialData }) {
  //const [data, setData] = useState({ hits: [] });
  

 
  //useEffect(() => {
    //const fetchData = async () => {
      //const result = await axios(
        //'https://hn.algolia.com/api/v1/search?query=redux',
      //);
      

      //setData(result.data);
    //};
 
    //fetchData();
  //}, []);
 
  

  return (
    <Main />
  );
}
