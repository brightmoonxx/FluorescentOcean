/*
 * @Author: WangXin
 * @Date: 2023-02-20 16:00:08
 * @LastEditors: WangXin
 * @LastEditTime: 2023-03-09 11:47:24
 * @FilePath: \myself\types\global.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by YuXing, All Rights Reserved.
 */
declare global {
  interface position {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
  }

  interface style extends position {
    [propName: string]: any;
  }
  interface editor {
    style: {
      width?: number;
      height?: number;
    };
    type?: background;
    data?: { url?: string };
    config?: any;
  }
  interface widget {
    uid?: string;
    readonly type?: widgetType;
    style: style;
    data?: imageData;
    config: widgetconfig;
  }
  type widgetconfig = background & image & text & video & linechart & component & pie & gauge & vantSwipe;

  interface imageData {
    url: string;
  }

  interface background {
    url?: string;
    turn?: number; //翻转
    opacity?: number; //透明度
    brightness?: number;
    contrast?: number;
    //  data_source?:number
  }
  interface image {
    turn?: number; //翻转
    opacity?: number; //透明度
    brightness?: number;
    contrast?: number;
  }
  interface text {
    value: string;
  }
  interface video {}
  interface linechart {
    data_source?: number;
    color: string;
    backgroundColor: string;
    simple: boolean;
  }
  interface pie {
    color?: string;
    backgroundColor?: string;
    data_source?: Array;
  }
  interface gauge {
    color?: number | string[][];
    backgroundColor?: string;
  }
  interface component {}
  interface vantSwipe {}
}
export {};
