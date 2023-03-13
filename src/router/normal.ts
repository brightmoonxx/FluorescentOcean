/*
 * @Author: WangXin
 * @Date: 2023-02-20 16:19:00
 * @LastEditors: WangXin
 * @LastEditTime: 2023-03-09 09:19:55
 * @FilePath: \myself\src\router\normal.ts
 * @Description:
 *
 * Copyright (c) 2023 by YuXing, All Rights Reserved.
 */

const Layout = () => import('@/layout/index.vue');
export const normalRoute = {
  path: '/',
  name: 'Home',
  component: Layout
  // children:[
  //     {
  //         path:"/telemetry",
  //         name:'telemetry',
  //         meta:{
  //             title: '用户管理',
  //             icon: 'telemetry'
  //         },
  //         component:()=>import('@/views/Telemetry/index.vue')
  //     }
  // ]
};
