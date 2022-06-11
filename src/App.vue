<template>
  <div id="nav">
    <div class="topbar bg-[#11B980] p-6"></div>
  </div>
  <router-view :key="$route.path" />
</template>
