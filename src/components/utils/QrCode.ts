import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import QRious from "qrious";

@Component
export default class QrCode extends Vue {
  @Prop({ required: true }) public value: string;
  @Prop({ required: false }) public options: object;

  @Watch("value")
  public onValueChanged() {
    this.generate();
  }

  @Watch("options")
  public onOptionsChanged() {
    this.generate();
  }

  public mounted() {
    this.generate();
  }

  public render(createElement) {
    return createElement("canvas", this.$slots.default);
  }

  private generate() {
    return new QRious(
      Object.assign(
        {
          element: this.$el,
          value: this.value,
        },
        this.options,
      ),
    );
  }
}
