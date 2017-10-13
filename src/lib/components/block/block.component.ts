import { Component, Input } from '@angular/core';

import { ColorWrap } from 'ngx-color';
import { isValidHex, getContrastingColor } from 'ngx-color/helpers';

@Component({
  selector: 'color-block',
  template: `
  <div class="block-card block-picker">
    <div class="block-triangle"
      *ngIf="triangle !== 'hide'"
      [style.border-color]="'transparent transparent ' + this.hex + ' transparent'"
    >
    </div>

    <div class="block-head" [style.background]="hex">
      <color-checkboard
       *ngIf="hex === 'transparent'"
        borderRadius="6px 6px 0 0"
      ></color-checkboard>
      <div class="block-label"
        [style.color]="getContrastingColor(hex)"
      >
        {{ hex }}
      </div>
    </div>

    <div class="block-body">
      <color-block-swatches
        [colors]="colors"
        (onClick)="handleBlockChange($event)"
        (onSwatchHover)="onSwatchHover.emit($event)"
      ></color-block-swatches>
      <color-editable-input
        [value]="hex"
        (onChange)="handleValueChange($event)"
        [style]="{input: input, wrap: wrap}"
      ></color-editable-input>
    </div>
  </div>
  `,
  styles: [`
    .block-card {
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 1px rgba(0, 0, 0, .1);
      position: relative;
    }
    .block-head {
      align-items: center;
      border-radius: 6px 6px 0 0;
      display: flex;
      height: 110px;
      justify-content: center;
      position: relative;
    }
    .block-body {
      padding: 10px;
    }
    .block-label {
      font-size: 18px;
      position: relative;
    }
    .block-triangle {
      border-style: solid;
      border-width: 0 10px 10px 10px;
      height: 0;
      left: 50%;
      margin-left: -10px;
      position: absolute;
      top: -10px;
      width: 0;
    }
  `],
})
export class BlockComponent extends ColorWrap {
  @Input() colors = [
    '#D9E3F0',
    '#F47373',
    '#697689',
    '#37D67A',
    '#2CCCE4',
    '#555555',
    '#dce775',
    '#ff8a65',
    '#ba68c8',
  ];
  @Input() width: string | number = 170;
  @Input() triangle: 'top' | 'hide' = 'top';
  triangleBorderColor: string;
  input = {
    width: '100%',
    'font-size': '12px',
    color: '#666',
    border: '0px',
    outline: 'none',
    height: '22px',
    'box-shadow': 'inset 0 0 0 1px #ddd',
    'border-radius': '4px',
    padding: '0 7px',
    'box-sizing': 'border-box',
  };
  wrap = {
    'position': 'relative',
    'width': '100%',
  };

  constructor() {
    super();
  }

  handleValueChange({ data, $event }) {
    this.handleBlockChange({ hex: data, $event });
  }
  getContrastingColor(hex) {
    return getContrastingColor(hex);
  }

  handleBlockChange({ hex, $event }) {
    if (isValidHex(hex)) {
      // this.hex = hex;
      this.handleChange(
        {
          hex,
          source: 'hex',
        },
        $event,
      );
    }
  }
}
