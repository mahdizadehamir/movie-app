<template>
  <div class="home">
    <SearchBox @dateValue="dateValue" @searchMovies="searchMovies()" />
    <div
      class="movieCardContainer mt-[119px] flex flex-wrap basis-4/12 justify-around max-w-[1024px] mx-auto "
    >
      <MovieCard
        class="mb-[35px] last:mb-0"
        v-for="movie in movies"
        :title="movie.title"
        :date="movie.release_date"
        :poster="movie.poster_path"
        :genre="movie.genre_ids"
        :key="movie.id"
        :movie="movie"
        :allGenres="allGenres"
        :movieId="movie.id"
      />
    </div>
    <Pagination
      @nextPage="handleNextPage()"
      @previousPage="handlePreviousPage()"
      :totalResultsCount="totalResultsCount"
      :pageResultsCount="pageResultsCount"
      :pageCount="pageCounter"
      :allPagesCount="allPages"
    />
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox.vue";
import Pagination from "../components/Pagination.vue";
import MovieCard from "../components/MovieCard.vue";
import { useRoute } from "vue-router";

export default {
  name: "Home",
  components: {
    SearchBox,
    Pagination,
    MovieCard,
  },
  data() {
    return {
      route: useRoute(),
      apiKey: "f62f750b70a8ef11dad44670cfb6aa57",
      startDay: "2020-01-01",
      endDay: "2021-01-01",
      movies: null,
      totalResultsCount: null,
      pageResultsCount: null,
      allGenres: [],
      page: localStorage.getItem("page") || 1,
      allPages: null,
      pageCounter: localStorage.getItem("page"),
    };
  },
  methods: {
    // search for movies
    dateValue(val) {
      const localstartDay = val[0].toISOString().split("T")[0];
      const localendDay = val[1].toISOString().split("T")[0];
      localStorage.setItem("movieApp-StartDay", localstartDay);
      localStorage.setItem("movieApp-EndDay", localendDay);
    },
    async searchMovies() {
      this.startDay = localStorage.getItem("movieApp-StartDay") || "2020-01-01";
      this.endDay = localStorage.getItem("movieApp-EndDay") || "2021-01-01";

      if (this.startDay && this.endDay != "") {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&primary_release_date.gte=${this.startDay}&primary_release_date.lte=${this.endDay}&page=${this.page}&sort_by=primary_release_date.asc`
        ) .catch(err => { console.log (err.response.data)});
        
        const data = await response.json();
        this.movies = data.results;
        this.totalResultsCount = data.total_results;
        this.pageResultsCount = data.results.length;
        this.allPages = data.total_pages;
        localStorage.setItem("page", this.page);
 
        
      }
    },
    // fetching all Generes from API
    async handleGenre() {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
      );
      const data = await response.json();

      this.allGenres = data.genres;
    },
    handleNextPage() {
      if (this.page < this.allPages) {
        if (this.page < 500) {
          this.page++;
          this.searchMovies();
        } else {
          this.page = 1;
          this.searchMovies();
        }
      } else {
        this.page = 1;
        this.searchMovies();
      }
    },
    handlePreviousPage() {
      if (this.page > 1) {
        this.page--;
        this.searchMovies();
      } else {
        this.page = 500;
        this.searchMovies();
      }
    },
  },
  async beforeMount() {
    await this.handleGenre();
    await this.searchMovies();
  },
  watch: {
    // watch for page Change for pass in pagination component
     page() {
      if (this.page > 1) {
        this.pageCounter = this.page;
      } else {
        this.pageCounter = 0;
      }
    },
  },
};
</script>

SearchBox
