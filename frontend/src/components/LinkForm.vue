<template>
  <form id="form-long" @submit.prevent="submitLink">
    <div class="link-input-wrapper">
      <input
        id="link-input"
        class="brutal brutal-animate link-input"
        placeholder="your link goes here!"
        type="text"
        v-model="original_url"
        required
        maxlength="2048"
        autocomplete="off"
      />
      <p class="link-error"></p>
    </div>
 

    <button type="submit" id="link-submit" class="link-submit brutal brutal-animate">
      <span id="submit-text">submit</span>
      <div id="submit-loader" class="lds-ellipsis hide">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "LinkForm",
  data() {
    return {
      original_url: "",
      shortenedLink: "", 
    };
  },
// LinkForm.vue
methods: {
  submitLink() {
    axios.post(process.env.VUE_APP_API_URL, {
  url: this.original_url, 
})
      .then((response) => {
        this.shortenedLink = process.env.VUE_APP_SHORT + response.data;
        this.$emit('shortened', this.shortenedLink); 
        this.original_url = '';
      })
      .catch((error) => {
        console.log(error);
      });
  },
},
};
</script>

<style>
.link-input-wrapper {
    display: inline;
    position: relative;
    width: 350px;
    height: 60px;
}

.link-input {
    width: 18rem;
    height: 28px;
    padding: 1rem;
    margin: 0.5rem 0;
}
.brutal {
    border: 2px solid #424242;
    box-shadow: 5px 5px #424242;
    font-weight: 600;
    font-size: 17px;
    transition: box-shadow .2s;
}
input, button {
    outline: none;
    background: #fff;
    border-radius: 0;
    border: none;
}


/* button css */

.brutal-animate:focus, .brutal-animate:hover {
    box-shadow: 2px 2px #424242;
    transition: box-shadow .2s;
}

.link-submit {
    background-color: #b2a4ff;
    color: #fff;
    cursor: pointer;
    height: 64px;
    width: 116px;
    margin-left: 0.25rem;
}

a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

a#png {
  font-size: 1.5rem;
}
a#webp {
    font-size: 1.5rem;
}
a#jpg {
    font-size: 1.5rem;
}



/* error message css */
.link-invalid+.link-error {
    color: red;
    display: block;
    font-size: .75rem;
    position: absolute;
    opacity: .5;
}

.link-error {
    position: relative;
    display: none;
    top: 18px;
    left: 18px;
}

@media only screen and (max-width: 480px){
  .link-input {
    width: 12rem;
}
.link-submit {
    width: 104px;
}
.link-final{
    width: 85%;
}
}

@media only screen and (max-width: 330px){
#app {
    width: 13.5rem;
}
.link-submit {
    width: 85px;
}
}
</style>
  