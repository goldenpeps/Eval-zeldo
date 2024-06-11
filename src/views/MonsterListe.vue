<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useMonsterStore } from "../stores/monsters.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const monsterStore = useMonsterStore();
const { fetchAllMonsters, setPage } = monsterStore;
const { monsters, currentPage } = storeToRefs(monsterStore);

onBeforeMount(async () => {
  const tryToFetch = await fetchAllMonsters();
});

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    setPage(currentPage.value - 1)
  }
}

const handleNextPage = () => {
  setPage(currentPage.value + 1)
}
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <!-- Monster list Start -->
      <div class="col">
        <div class="mb-5">
          <h3 class="text-uppercase border-start border-5 border-primary ps-3">
            Every Monsters
          </h3>
          <h5
            class="text-uppercase border-start border-5 border-primary ps-3 mb-4"
          >
            Page {{ currentPage }}
          </h5>

          <div
            class="d-flex overflow-hidden mb-3 bg-light"
            v-for="items in monsters"
            :key="items._id"
          >
            <img
              class="img-fluid"
              :src="items.image"
              style="width: 100px; height: 100px; object-fit: cover"
              alt=""
            />
            <RouterLink
              :to="{ name: 'monstersdetail', params: { monster: items._id }}"
              class="h5 d-flex align-items-center bg-light px-3 mb-0"
            >
              {{ items.name }}
            </RouterLink>
          </div>
        </div>
        <button type="button" class="btn btn-outline-success" @click="handlePrevPage">Prev</button>
        <button type="button" class="btn btn-outline-success" @click="handleNextPage">Next</button>
      </div>
      <!-- Monster list End -->
    </div>
  </div>
</template>
