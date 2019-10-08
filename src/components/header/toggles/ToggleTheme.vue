<template>
  <button
    class="px-2 py-2 md:py-4 text-yellow flex-none flex items-center border-b-2 mt-2px border-transparent hover:border-theme-accents transition"
    @click="$store.dispatch('ui/setNightMode', !nightMode)"
    @mouseover="changeImageSource"
    @mouseleave="setImageSource"
  >
    <img :src="imageSource" width="30" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class ToggleTheme extends Vue {
  private nightMode: boolean;
  private imageSource = null;

  public mounted() {
    this.prepareComponent();
  }

  private prepareComponent() {
    this.setImageSource();

    this.$store.watch(state => state.ui.nightMode, value => this.setImageSource());
  }

  private setImageSource() {
    const name = this.nightMode ? "sun" : "moon";

    this.imageSource = require(`@/assets/images/theme/${name}.svg`);
  }

  private changeImageSource() {
    const name = this.nightMode ? "sun" : "moon";

    this.imageSource = require(`@/assets/images/theme/hover/${name}.svg`);
  }
}
</script>
