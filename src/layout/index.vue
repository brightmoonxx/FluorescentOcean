<!--
 * @Author: WangXin
 * @Date: 2023-02-20 15:05:50
 * @LastEditors: WangXin
 * @LastEditTime: 2023-03-13 18:45:21
 * @FilePath: \FluorescentOcean\src\layout\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by YuXing, All Rights Reserved. 
-->
<script setup lang="ts">
import { ref, reactive, markRaw, onMounted, onUnmounted } from 'vue';
onMounted(() => {
  initFluorescent();
  // window.requestAnimationFrame(draw);
});
let ctx;
interface point {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  mx: boolean;
  my: boolean;
}
let fluorescentPoints = new Array<point>();
const particleRadius = 0.5;
const initFluorescent = () => {
  const fluorescent: HTMLCanvasElement = document.querySelector('#fluorescent');
  ctx = fluorescent.getContext('2d');
  for (let i = 0; i < 1; i++) {
    const randomX = Math.floor(Math.random() * 1920);
    const randomY = Math.floor(Math.random() * 1080);
    fluorescentPoints.push({
      x: randomX,
      y: randomY,
      speedX: Math.floor(Math.random() * 3),
      speedY: Math.floor(Math.random() * 3),
      mx: getRandomBoolean(),
      my: getRandomBoolean()
    });
    // createArc(randomX, randomY);
  }
  loadStatePoints();
  // highLightArea(500, 500, 100, 100, 5, 100);
  // draw(false);
  // animate();
};
const getNewPoint = (operator, value, diff, max) => {
  const condition = {
    true: () => value + (value > max || value < 0 ? diff * -1 : diff),
    false: () => value - (value > max || value < 0 ? diff * -1 : diff)
  };
  // console.log(value, max, operator);
  console.log(condition[operator + '']());
  return condition[operator + '']();
};
const getRandomBoolean = (): boolean => Math.random() >= 0.5;
const isDraw = ref(true);
const clearAnimatePoint = () => {
  fluorescentPoints.forEach((item) => {
    let { x, y } = item;
    ctx.clearRect(item.x, item.y, width, width);
  });
};
const draw = (isAnimate) => {
  isDraw.value = false;
  // console.log('开始绘制' + new Date().getTime());

  // ctx.clearRect(0, 0, 1920, 1080);
  clearAnimatePoint();
  fluorescentPoints.forEach((item) => {
    let { x, y, speedY, speedX, mx, my } = item;
    // if (speedX == 0 && isAnimate) return;
    item.x = mx ? x + speedX : x - speedX;
    item.y = my ? y + speedY : y - speedY;
    item.speedX *= item.x > 1920 || item.x < 0 ? -1 : 1;
    item.speedY *= item.y > 1080 || item.y < 0 ? -1 : 1;
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x + width / 2, y + width / 2, 0, x + width / 2, y + width / 2, 200);
    gradient.addColorStop(0, '#50eafb');
    gradient.addColorStop(0.25, '#50eafb');
    gradient.addColorStop(1, '#000');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, width);
    ctx.closePath();
  });
  isDraw.value = true;
  console.log('绘制时间' + new Date().getTime());
};
const animate = () => {
  requestAnimationFrame(animate);
  if (isDraw.value) {
    draw(true);
    setTimeout(() => {}, 1000);
  }
};
const highLightArea = (x, y, width, height, r, count) => {
  for (let i = 0; i < count; i++) {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const randomX = Math.floor((Math.random() * r) / 2) * (getRandomBoolean() ? 1 : -1);
    const randomY = Math.floor((Math.random() * r) / 2) * (getRandomBoolean() ? 1 : -1);
    const flag = randomX * randomX + randomY * randomY <= (r / 2) * (r / 2);
    if (flag) {
      const x = cx + randomX;
      const y = cy + randomY;
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(x + particleRadius / 2, y + particleRadius / 2, 0, x + particleRadius / 2, y + particleRadius / 2, 200);
      gradient.addColorStop(0, '#50eafb');
      ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
    }
  }
};
const drawPoints = (count, color, height, radius = 0.8) => {
  const maxY = 1000;
  const lightRadius = 1.5;
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 1920);
    const y = maxY - Math.floor(Math.random() * height);
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x + radius / 2, y + radius / 2, 0, x + radius / 2, y + lightRadius / 2, 200);
    gradient.addColorStop(0, color);
    // gradient.addColorStop(1, color);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
  }
};

const loadStatePoints = () => {
  const bottom = 200;
  const maxY = 1000;
  const lightRadius = 1.5;
  // drawPoints(1, '#43FFFF', 100, 100);
  drawPoints(3000, '#43FFFF', 100, 1.5);
  drawPoints(4000, '#34EDFF', 150);
  drawPoints(3000, '#1BD4FF', 200);
  drawPoints(4000, '#21C2FD', 250);
  drawPoints(5000, '#1298FC', 350);
  drawPoints(6000, '#0080E5', 400);
  drawPoints(10000, '#006FD5', 450);
  // drawPoints(5000, '#4A9EDD');
  // drawPoints(5000, '#0983DC');
  // for (let i = 0; i < 10000; i++) {
  //   const x = Math.floor(Math.random() * 1920);
  //   const y = maxY - Math.floor(Math.random() * 100);
  //   ctx.beginPath();
  //   const gradient = ctx.createRadialGradient(x + particleRadius / 2, y + particleRadius / 2, 0, x + particleRadius / 2, y + particleRadius / 2, 200);
  //   // gradient.addColorStop(0, '#50eafb');
  //   gradient.addColorStop(0, '#50eafb');
  //   // gradient.addColorStop(0.5, '#0385f7');
  //   // gradient.addColorStop(0.75, '#0148b3');
  //   // gradient.addColorStop(1, '#0041a8');
  //   ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
  //   ctx.fillStyle = gradient;
  //   ctx.fill();
  //   ctx.closePath();
  //   // createArc(randomX, randomY);
  // }
  // for (let i = 0; i < 10000; i++) {
  //   const x = Math.floor(Math.random() * 1920);
  //   const y = maxY - Math.floor(Math.random() * 100);
  //   ctx.beginPath();
  //   const gradient = ctx.createRadialGradient(x + particleRadius / 2, y + particleRadius / 2, 0, x + particleRadius / 2, y + particleRadius / 2, 200);
  //   // gradient.addColorStop(0, '#50eafb');
  //   gradient.addColorStop(0, '#2763c9');
  //   // gradient.addColorStop(0.5, '#0385f7');
  //   // gradient.addColorStop(0.75, '#0148b3');
  //   // gradient.addColorStop(1, '#0041a8');
  //   ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
  //   ctx.fillStyle = gradient;
  //   ctx.fill();
  //   ctx.closePath();
  //   // createArc(randomX, randomY);
  // }
  // for (let i = 0; i < 10000; i++) {
  //   const x = Math.floor(Math.random() * 1920);
  //   const y = maxY - Math.floor(Math.random() * 100);
  //   ctx.beginPath();
  //   const gradient = ctx.createRadialGradient(x + particleRadius / 2, y + particleRadius / 2, 0, x + particleRadius / 2, y + particleRadius / 2, 200);
  //   // gradient.addColorStop(0, '#50eafb');
  //   gradient.addColorStop(0, '#1359dd');
  //   // gradient.addColorStop(0.5, '#0385f7');
  //   // gradient.addColorStop(0.75, '#0148b3');
  //   // gradient.addColorStop(1, '#0041a8');
  //   ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
  //   ctx.fillStyle = gradient;
  //   ctx.fill();
  //   ctx.closePath();
  //   // createArc(randomX, randomY);
  // }
};
</script>
<template>
  <div class="fluorescent-ocean w-full h-full bg-black">
    <canvas id="fluorescent" width="1920" height="1080"></canvas>
  </div>
</template>
<style scoped lang="scss"></style>
