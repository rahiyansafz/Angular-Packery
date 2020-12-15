import { Widget } from '@zivac/ng-packery';

export class Chart extends Widget {

    data: Array<{name: string, value: number}>;
    type: string;

    constructor(size: [number, number], type?: string, data?: Array<{name: string, value: number}>) {
      super(size);
      this.data = data;
      setTimeout(() => {
        this.type = type;
      });
    }

    redraw() {
      const type = this.type;
      this.type = null;
      setTimeout(() => {
        this.type = type;
      });
    }

}