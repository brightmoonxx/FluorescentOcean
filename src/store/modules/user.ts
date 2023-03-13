/*
 * @Author: WangXin
 * @Date: 2023-02-21 11:20:39
 * @LastEditors: WangXin
 * @LastEditTime: 2023-02-22 09:16:53
 * @FilePath: \pnpm-demo\src\store\modules\user.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by YuXing, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import { store } from "@/store";
export const useUserStore = defineStore({
    id: "user",
    state:()=>({
       name:''
    }),
    actions:{
        
    }
})
export function useUserStoreHook() {
    return useUserStore(store);
  }