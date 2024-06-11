import { ref } from 'vue'
import { defineStore } from 'pinia'
import ky from 'ky'


const API_ENDPOINT = 'http://localhost:3000/'



export const useBookStore = defineStore('books', () => {
  
  const books = ref([])
  const currentBook = ref({})

  const fetchAllBooks = async ()=>{
    const rawRet   = await ky.get(API_ENDPOINT+'books')
    const respJson = await rawRet.json()
    books.value = respJson
    console.log(books)
    return respJson
  }

  return { 
    fetchAllBooks,
    books,
    currentBook
  }

})
