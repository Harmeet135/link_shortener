
<template>
  <div id="app">
    <div class="link-hero">
				<div>
					<h1 class="hero-header">HyperSlice</h1>
				</div>
				<a href="https://github.com/" target="_blank">
					<img id="github-logo"
          :src="require('@/assets/github.svg')"
						width={32}
						height={32}
						alt="Github Logo"
					/>
				</a>
			</div>
    <link-form @shortened="updateShortenedLink" />
    <shortened-link-display :shortenedLink="shortenedLink" />
  </div>
</template>

<script>
import LinkForm from "./components/LinkForm.vue";
import ShortenedLinkDisplay from "./components/ShortenedLinkDisplay.vue";

export default {
  data() {
    return {
      shortenedLink: "",
    };
  },
  methods: {
    updateShortenedLink(link) {
      this.shortenedLink = link;
    },
  },
  components: {
    LinkForm,
    ShortenedLinkDisplay,
  },
};
</script>

<style>
body{
  background: url("./assets/wave.svg") center/cover no-repeat;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0;
  padding: 0;
}
#app{
  width: 28rem;
}

.link-hero {
    line-height: .75;
    padding-bottom: 1.5rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#github-logo {
  width: 32px;
  height: 32px;
}
@media only screen and (max-width: 480px){
  #app {
    width: 21rem;
}
}

@media only screen and (max-width: 330px){
#app {
    width: 13.5rem;
}
}
</style>