import Head from 'next/head'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Books from './components/books';

export default function Home() {
  const [books, setBooks] = useState();
  const [search, setSearch] = useState('javascript');
  const [MaxResults, setMaxResults] = useState(12);
  const [error, setError] = useState('');
  const apikey = 'AIzaSyDlZnz8_eRUVRWOwFCHUmfae9yjNFc0RzM';

  useEffect(() => {

    async function HandlerSearch() {
      const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search?search:null}&orderBy=relevance&maxResults=${MaxResults}&:keyes&key=${apikey}`);
      if(result){
        const {items} = result.data;
        console.log(result.data)
        setBooks(items);
      }
    }

    HandlerSearch();


  }, [search,MaxResults])

  // const handlerSearch = async () => {
  //   setBooks(null)
  //   await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=12&:keyes&key=${apikey}`).then((result) => {
  //     const { items } = result.data
  //     setBooks(items)
  //   }).catch(() => {

  //   })
  // }



  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <label htmlFor="">Buscar Livros:</label>
        <input type="search" name="search" placeholder="Buscar Ebook" onChange={event => (setSearch(event.target.value))} />
        <input type="number" name="maxResultas" className={styles.inputNumber} onChange={event =>(setMaxResults(event.target.value))} />
      </div>
      <div className={styles.ebooks}>
        {
          books ? books.map((item, key) => (
            <Books data={item} key={key} />
          )) : <div>Loading...</div>
        }
      </div>
    </div>
  )
}
