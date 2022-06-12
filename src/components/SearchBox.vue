<template>
  <div
    class="font-roboto leading-tight searchBox mt-[69px] text-center rounded-md w-[1024px]  mx-auto bg-[#E2E2E2] box-border px-[81px] py-[33px]"
  >
    <form @submit.prevent="$emit('searchMovies',$event)" class="flex justify-between" action="">
      <div class="self-center flex justify-center ">
        <label class="mr-[29px] w-[165px] inline-block self-center">Search by release date: </label>
        <DatePicker
          class="inline-block w-[221px] h-[33px] rounded-none self-center"
          lang="en"
          range
          v-model="selectedDate"
          :date-format="{
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }"
        />
      </div>
      <button
        class="bg-[#549DF2] text-white px-[12px] py-[7px] rounded-full self-center hover:text-gray-300"
       
      >
        Search
      </button>
    </form>
  </div>
</template>

<script>
import "../../node_modules/flowbite/dist/datepicker";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
//importing 3rd party DatePicker component
export default {
  components: { DatePicker: VueDatepickerUi },
  data() {
    return {
      selectedDate: [
        // default start date for DatePicker
         new Date(localStorage.getItem("movieApp-StartDay") || "2021-01-01"), 
        new Date(localStorage.getItem("movieApp-EndDay") || "2022-01-01" ),
      ],
    };
  },
  emits: ["dateValue","searchMovies"],
  methods: {
   
  },
  // passing DatePicker Value to Home.vue
  watch: {
    selectedDate: function (val) {
      this.$emit("dateValue", val);
    },
  },
};
</script>

<style scoped>
 

</style>
