<script setup>
import { onBeforeMount } from 'vue'
import { useMonsterStore } from '../stores/monsters.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()
const monsterStore = useMonsterStore()
const { fetchMonsterById } = monsterStore
const { currentMonster } = storeToRefs(monsterStore)

onBeforeMount(async () => {
  const monsterId = route.params.monster
  await fetchMonsterById(monsterId)
})
</script>

<template>
  <div class="container-fluid py-5">
    <div class="container">
      <div class="row gx-5">
        <div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 500px;">
          <div class="position-relative h-100">
            <img class="position-absolute w-100 h-100 rounded" :src="currentMonster.image" style="object-fit: cover;">
          </div>
        </div>
        <div class="col-lg-7">
          <div class="border-start border-5 border-primary ps-5 mb-5">
            <h6 class="text-primary text-uppercase">{{ currentMonster.category }}</h6>
            <h1 class="display-5 text-uppercase mb-0">{{ currentMonster.name }}</h1>
          </div>
          <h4 class="text-body mb-4">{{ currentMonster.description }}</h4>

          <div class="border-start border-5 border-primary ps-5 mb-5">
            <h6 class="text-primary text-uppercase">DROPS</h6>
            <ul>
              <li v-for="drop in currentMonster.drops" :key="drop">{{ drop }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
