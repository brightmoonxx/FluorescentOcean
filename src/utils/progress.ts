/*
 * @Author: WangXin
 * @Date: 2023-02-23 20:37:37
 * @LastEditors: WangXin
 * @LastEditTime: 2023-02-23 21:12:54
 * @FilePath: \myself\src\utils\progress.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by YuXing, All Rights Reserved. 
 */
import NProgress from 'nprogress'
import "nprogress/nprogress.css";
NProgress.configure({
    // 动画方式
    easing: "ease",
    // 递增进度条的速度
    speed: 500,
    // 是否显示加载ico
    showSpinner: false,
    // 自动递增间隔
    trickleSpeed: 200,
    // 初始化时的最小百分比
    minimum: 0.3,
    
  });
  
  export default NProgress;