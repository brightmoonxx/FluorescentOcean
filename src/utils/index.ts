/*
 * @Author: WangXin
 * @Date: 2023-02-24 17:35:43
 * @LastEditors: WangXin
 * @LastEditTime: 2023-02-28 21:12:48
 * @FilePath: \myself\src\utils\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by YuXing, All Rights Reserved. 
 */
import { v4 as uuidv4 } from 'uuid';
export function getUuid () :string{
   return uuidv4()
}
export function getStyle(style, filter = []) {
   const noNeedUnit = [
     'color',
     'background',
     'backgroundColor',
     'textAlign',
     'opacity',
     'fontWeight',
     'fontFamily',
     'borderColor',
     'textIndent',
     'fontStyle',
     'margin',
     'textShadow'
   ]
   const result = {transform:''}
   Object.keys(style).forEach(key => {
     if (!filter.includes(key)) {
       if (key != 'rotate') {
         result[key] = style[key]
 
         if (!noNeedUnit.includes(key)) {
           result[key] += 'px'
         }
       } else {
         result.transform = key + '(' + style[key] + 'deg)'
       }
     }
   })
 
   return result
 }