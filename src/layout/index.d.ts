import type { Position } from '@element-plus/icons-vue';
import type { number } from 'echarts/core';

export interface elementType {
  type: string;
  uid: string;
  style: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  config: object;
}
export interface position {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}
