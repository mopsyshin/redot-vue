<template>
  <div class="main-container">
    <div class="view-container">
    <transition name="main-view-transition" appear>
      <div class="main-view" :class="{ fullsize : !rsbIsOpen }">
        <!-- <keep-alive> -->
        <router-view name="mv"></router-view>
        <!-- </keep-alive> -->
      </div>
    </transition>
      <button class="btn-toggle-rsb" @click="rsbToggle" >
        <img src="@/assets/icn-down.svg" alt="" :class="{ close : !rsbIsOpen}">
      </button>
      <div class="rsb-view" :class="{ close : !rsbIsOpen }">
        <transition name="rsb-animation" mode="out-in" appear>
          <!-- <keep-alive> -->
           <router-view name="rsb"></router-view>
          <!-- </keep-alive> -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  methods: {
    rsbToggle() {
      this.$store.commit('toggleRsb')
      setTimeout(() => {
        this.$redrawVueMasonry()
      },300)
    }
  }

}
</script>

<style>
</style>


