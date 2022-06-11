<template>
  <div class="movieDetail font-roboto leading-[22px]">
    <!-- header -->
    <div
      class="mt-[69px] bg-[#e2e2e2] w-[1024px] h-[85px] mx-auto rounded-md flex"
    >
      <button
        @click=" $router.go(-1) "
        class="ml-[35px] bg-[#549DF2] text-[16px] text-white px-[12px] py-[7px] rounded-full self-center hover:text-gray-500"
      >
        <div class="w-[92px] h-[33px] flex justify-center">
          <LeftArrow class="w-5 self-center" />
          <span class="self-center ml-2 mr-3">Back</span>
        </div>
      </button>
      <div class="self-center ml-[64px]">
        <h2 class="font-bold text-[18px]">{{ title }}</h2>
        <span class="text-[18px]">{{ tagline }}</span>
      </div>
    </div>
    <!-- Movie Info -->
    <div class="mt-[78px] flex justify-between w-[1024px] mx-auto">
      <div class="imageContainer w-330px h-495px self-start">
        <img
          class="w-[330px] h-[495px] rounded-xl"
          :src="`https://image.tmdb.org/t/p/w500/${poster}`"
          alt=""
        />
      </div>
      <div class="textContainer flex flex-col text-[#1e1e1e]">
        <div class="budget flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">Budget</h3>
          <span>${{ budget }}</span>
        </div>
        <div class="Revenue flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">Revenue</h3>
          <span>${{ revenue }}</span>
        </div>
        <div class="Release-Date flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">Release Date</h3>
          <span>{{ releaseDate }}</span>
        </div>
        <div class="Runtime flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">Runtime</h3>
          <span>{{ runtime }}</span>
        </div>
        <div class="score flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">Score</h3>
          <span>{{ score }} ({{ vote }} votes)</span>
        </div>
        <div class="genres flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">Generes</h3>
          <span>{{ genres }}</span>
        </div>
        <div class="imdb flex justify-between w-[600px] mb-[18px]">
          <h3 class="font-bold">IMDB Link</h3>
          <a class="underline text-[#318fe7] hover:text-gray-500" :href="imdbLink">Link</a>
        </div>
        <div class="homePage flex justify-between w-[600px]">
          <h3 class="font-bold">Homepage Link</h3>
          <a class="underline text-[#318fe7] hover:text-gray-500" :href="homepageLink">Link</a>
        </div>
      </div>
      <!-- About MOvie -->
    </div>
    <div class="mt-[53px] block max-w-[1024px] mx-auto mb-[471px]">
      <p class="text-[16px] text-[#1e1e1e] leading-[22px]">
        {{ overview }}
      </p>
      <h2 class="font-bold text-[18px] block mt-[80px] mb-[12px]">Credit:</h2>
      <p class="text-[14px] text-[#1e1e1e]">{{ credit }}</p>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import LeftArrow from "../assets/LeftArrow.vue";
export default {
  components: { LeftArrow },
  data() {
    return {
      route: useRoute(),
      apiKey: "f62f750b70a8ef11dad44670cfb6aa57",
      imdbLink:null,
      title: null,
      tagline: null,
      poster: null,
      budget: null,
      revenue: null,
      runtime: null,
      score: null,
      vote: null,
      releaseDate: null,
      genres: null,
      overview: null,
      credit: null,
      homepageLink: null
    };
  },
  methods: {
    async searchMovieDetail() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${this.route.params.id}?api_key=${this.apiKey}&language=en-US`
      );
      const data = await response.json();
      this.title = data.title;
      this.tagline = data.tagline;
      this.poster = data.poster_path;
      this.budget = data.budget.toLocaleString().replace(/,/g, "'");
      this.revenue = data.revenue.toLocaleString().replace(/,/g, "'");
      this.runtime = this.timeConvert(data.runtime);
      this.releaseDate = data.release_date;
      this.score = data.vote_average;
      this.vote = data.vote_count;
      this.genres = data.genres.map((genre) => genre.name).join(", ");
      this.overview = data.overview;
      this.homepageLink = data.homepage;
      this.imdbLink ="https://www.imdb.com/title/"+ data.imdb_id;
    },
    async handleCredits() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${this.route.params.id}/credits?api_key=${this.apiKey}&language=en-US`
      );
      const data = await response.json();
      this.credit = data.cast.map((cast) => cast.name).join(", ");
    },
    timeConvert(t) {
      const timing = t;
      const hours = Math.floor(timing / 60);
      const minutes = timing % 60;
      return hours + "h " + minutes + "m";
    },
  },
  async created() {
    await this.searchMovieDetail();
    await this.handleCredits();
  },
  mounted(){
      window.scrollTo(0, 0)
  }
};
</script>
