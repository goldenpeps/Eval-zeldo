import { ref } from 'vue'
import { defineStore } from 'pinia'
import ky from 'ky'

const API_ENDPOINT = 'https://metallo.ew.r.appspot.com/'

export const useMonsterStore = defineStore('monsters', () => {
  const monsters = ref([])
  const currentMonster = ref({})
  const currentPage = ref(1)
  const limit = 40

  const fetchAllMonsters = async (page = 1) => {
    const rawRet = await ky.get(`${API_ENDPOINT}monsters?page=${page}&limit=${limit}`)
    const respJson = await rawRet.json()
    monsters.value = respJson
    return respJson
  }

  const fetchMonsterById = async (id) => {
    const rawRet = await ky.get(`${API_ENDPOINT}monsters/${id}`)
    const respJson = await rawRet.json()
    currentMonster.value = respJson
    return respJson
  }

  const setPage = (page) => {
    currentPage.value = page
    fetchAllMonsters(page)
  }

  return { 
    fetchAllMonsters,
    fetchMonsterById,
    monsters,
    currentMonster,
    currentPage,
    setPage
  }
})
