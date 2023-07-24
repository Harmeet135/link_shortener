<template>
  <div id="form-short">
    <div>
      <h6 class="link-final-header">shortened link:</h6>
      <input
        id="link-short"
        class="brutal link-input link-final"
        type="text"
        autocomplete="off"
        :value="shortenedLink"
        disabled
      />
    </div>

    <button class="link-copy" @click="copyToClipboard">
      <span class="material-symbols-sharp"><svg-icon type="mdi" :path="path"></svg-icon></span>
    </button>
  </div>
  <div id="qr-wrapper" class="link-qr-wrapper hide">
				<h2>QR Code</h2>
				<div class="link-qr">
					<canvas id="qr"/>
					<div class="qr-controls">
						<a id="png" class="qr-button brutal brutal-animate" download>PNG</a>
						<a id="webp" class="qr-button brutal brutal-animate" download>WEBP</a>
						<a id="jpg" class="qr-button brutal brutal-animate" download>JPG</a>
					</div>
				</div>
			</div>
</template>
<script>
import { createConfetti } from '../scripts/index.js';
import { generateQR } from '../scripts/index.js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiContentCopy } from '@mdi/js';

export default {
  props: ["shortenedLink"],
  components: {
    SvgIcon
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard
        .writeText(this.shortenedLink)
        .then(() => {
          const copyButton = document.querySelector(".link-copy");
          createConfetti(copyButton);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    },
  },
  watch: {
    shortenedLink(newVal) {
      this.$nextTick(() => {
        generateQR(newVal);
      });
    },
  },

data() {
    return {
       path: mdiContentCopy,
    }
  }
};
</script>

<style scoped>
#form-short {
  position: relative;
}
.link-final-header {
  position: absolute;
  top: -10px;
  left: 18px;
  font-size: 11px;
}
.link-final[data-v-5d500174] {
    width: 92%;
    padding: 19px 15px 9px 17px;
    font-size: larger;
}
.link-copy {
  background-color: #424242;
  box-shadow: 2px 2px #424242;
  border: 1px solid #fff;
  cursor: pointer;
  color: #fff;
  position: absolute;
  height: 30px;
  width: 30px;
  top: 22px;
  right: 10px;
  transition: box-shadow 0.2s;
}

/* Link QR Code */
.link-qr-wrapper {
    height: 150px;
    width: inherit;
    position: absolute;
}

.link-qr {
    display: flex;
}

.link-qr > canvas {
    border: 5px solid white;
}

.link-final{
    width: 92%;
}

.qr-controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0.5rem;
}

.qr-button {
    background-color: #b2a4ff;
    color: #fff;
    cursor: pointer;
    height: 40px;
    width: 90px;
    text-decoration: none;
}

.link-copy:hover {
  background-color: #fff;
  border-color: #424242;
  border-width: 1px;
  box-shadow: 1px 1px #424242;
  color: inherit;
}

.link-copy > span {
  vertical-align: middle;
}

.hide {
    display: none !important;
}
.material-symbols-sharp{
  display: flex;
}
</style>
