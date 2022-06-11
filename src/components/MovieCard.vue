<template>
<router-link class="w-[295px] h-[195px]  " :to="`/movie/${movieId}`">
  <div 
    class=" flex flex-row  bg-[#f1f1f1] rounded-md border-solid border-[#c4c4c4] border-[1px] box-border"
  >
    <div class="w-[120px] h-[193px]  ">
      <img
        class="w-full h-full object-cover rounded-tl-md rounded-bl-md "
        :src="`https://image.tmdb.org/t/p/w500/${poster}`"
        alt="movie-img"
      />
    </div>
    <div class="w-[171px] pl-[10px] pt-[10px] pr-[8px] pb-[6px] flex flex-col justify-between ">
      <h2 class="font-bold text-[16px]">{{ title }}</h2>
      <div>
        <div class="dateContainer mb-[15px]  flex flex-row text-[12px]">
          <CalendarIcon class="w-[16px] h-[16px] self-center" />
          <span class="ml-[7px] text-[#4e4e4e] text-[12px] self-center">{{
            date
          }}</span>
        </div>
        <div class="">
          <ul class="text-[12px] text-[#505050] list-disc flex justify-start flex-wrap pl-[10px]">
            <li class="mr-5 first-of-type:list-none indent-[-6px] " v-for="item in genre" :key="item">
              {{ allGenres.find((x) => { return (x.id === item   ) }).name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script>
import CalendarIcon from "../assets/CalendarIcon.vue";
export default {
  data() {
    return {
      apiKey: "f62f750b70a8ef11dad44670cfb6aa57",
      
    };
  },
  components: { CalendarIcon },
  props: ["movieId","title", "date", "poster", "genre","allGenres"],
  created() {
    
  },
};
</script>

<style></style>
