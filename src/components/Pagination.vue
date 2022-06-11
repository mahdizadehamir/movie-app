<template>
  <div class="flex flex-col items-center mt-[161px] mb-[90px] font-roboto">
    <!-- Buttons -->
    <div class="flex mt-2 xs:mt-0 justify-center">
      <button @click="handlePreviousPage()" class="self-center text-black-rgba font-bold text-[16px]">
        Previous Page
      </button>
      <div
        class="w-[40px] h-0 border  border-[#6a6a6a] transform rotate-90 m-[30px]"
      ></div>
      <button @click="handleNextPage" class="text-[#318FE7] font-bold text-[16px]">Next Page</button>
    </div>
    <span class="self-center ml-6 text-[#989898]">
      Showing results
      <span class="">{{ (pageCount * 10) +1 }}</span>-<span class="">{{ pageCount*10 + pageResultsCount }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["totalResultsCount","pageResultsCount","pageCount","allPagesCount"],
  emits:["nextPage","previousPage"],
  methods:{
       handleNextPage(){
      this.$emit('nextPage')
    },
    handlePreviousPage(){
      this.$emit('previousPage')
    },
    
  }
};
</script>

<style></style>
