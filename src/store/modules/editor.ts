/*
 * @Author: WangXin
 * @Date: 2023-02-27 20:29:47
 * @LastEditors: WangXin
 * @LastEditTime: 2023-03-06 17:56:38
 * @FilePath: \myself\src\store\modules\editor.ts
 * @Description:
 *
 * Copyright (c) 2023 by YuXing, All Rights Reserved.
 */
import { defineStore } from 'pinia';
import { store } from '@/store';
export const useEditorStore = defineStore({
  id: 'editor',
  state: () => ({
    editor: <editor> {
      style:{
        width: 1920,
        height: 1080,
      },
      type:'background',
      data:{url:'',},
      config:{}
    },
    scale: 0.7,
    defaultScale: 0.75,
    elements: [] as widget[],
    curEditElement: <widget>{
      style: {},
      config: {}
    },
    curEditGroup: {
      style: {} as position,
      elements : []  as widget[]
    },
    copyGroupElements: [],
    copyGroupStyle: {} as position,
    isMove: false,
    isDrag: false,
    showLine: false,
    editorCursor: 'auto',
    showGroup: false,
    showMenu: false,
    showConfig:false,
    menuPosition: {} as position
  }),
  getters: {
    getEditorStyle(): position {
      return this.editor.style;
    },
    getEditor(): any {
      return this.editor;
    },
    getEditorDefaultScale(): any {
      return this.defaultScale;
    },
    getEditorElements(): widget[] {
      return this.elements;
    },
    getCurEditElement(): widget {
      return this.curEditElement;
    },
    getCurEditGroup(): any {
      return this.curEditGroup;
    }
  },
  actions: {
    setShowConfig(value:boolean){
      this.showConfig = value
    },
    setEditorConfig(element ){
      this.editor.data = element.data
      this.editor.config = element.config
    },
    setEditorStyle({width,height}:position){
      if(width && height){
        const clientHeight: number = document.body.clientHeight;
        const scale  = +((clientHeight * this.defaultScale) / height).toFixed(5)
        this.setEditorScale(scale)
        const rateW = this.editor.style.width/width
        const rateH = this.editor.style.height/height
        const curMaxSize = width>height?width:height
        const oldMaxSize = this.editor.style.width>this.editor.style.height?this.editor.style.width:this.editor.style.height
        this.changeElementsStyleByResize(rateW,rateH,curMaxSize,oldMaxSize)
        this.editor.style.width = width
        this.editor.style.height = height
      }
    },
    changeElementsStyleByResize(rateW,rateH,curMaxSize,oldMaxSize){
     if(this.elements.length == 0) return
     this.elements.forEach(item=>{
      item.style.left = +(item.style.left/rateW).toFixed(5)
      item.style.top = +(item.style.top/rateH).toFixed(5)
      const rateX = item.style.width/oldMaxSize
      const rateY = item.style.height/oldMaxSize
      item.style.width = rateX*curMaxSize
      item.style.height = rateY*curMaxSize

     })
    },
    setEditorScale(value: number): void {
      this.scale = value;
    },
    addElementToEditor(element) {
      this.elements.push(element);
      this.curEditElement = element;
    },
    setCurEditElement(element:widget) {
      this.curEditElement = element;
    },
    setCurEditElementConfigByKey(key:string,value){
      this.curEditElement.config[key] = value
    },
    setCurEditGroup(style, elements) {
      this.curEditGroup.style = style;
      this.curEditGroup.elements = elements;
      this.copyGroupElements = JSON.parse(JSON.stringify(elements));
      this.copyGroupStyle = JSON.parse(JSON.stringify(style));
    },
    resetCopyGroupElements() {
      this.copyGroupElements = JSON.parse(JSON.stringify(this.curEditGroup.elements));
      this.copyGroupStyle = JSON.parse(JSON.stringify(this.curEditGroup.style));
    },
    setIsMove(value: boolean) {
      this.isMove = value;
    },
    setIsDrag(value: boolean) {
      this.isDrag = value;
    },
    setEditorCursor(value: string) {
      this.editorCursor = value;
    },
    setIsShowLine(value: boolean) {
      this.showLine = value;
    },
    setShowGroup(value: boolean) {
      this.showGroup = value;
    },
    setShowMenu(value: boolean) {
      this.showMenu = value;
    },
    setMenuPosition({ left, top }) {
      this.menuPosition.left = left;
      this.menuPosition.top = top;
      this.showMenu = true;
    },
    setCurEditGroupStyle({ top, left, width, height }: position): void {
      setStyle(top, this.curEditGroup.style, 'top');
      setStyle(left, this.curEditGroup.style, 'left');
      setStyle(width, this.curEditGroup.style, 'width');
      setStyle(height, this.curEditGroup.style, 'height');
    },
    setCurEditGroupElementsStyle({ top, left, width, height }: position, source: string) {
      const { top: cpTop, left: cpLeft, width: cpWidth, height: cpHeight } = this.copyGroupStyle;
      const diff_top = top - cpTop;
      const diff_left = left - cpLeft;
      this.curEditGroup.elements.forEach((item, index) => {
        const { top: oldTop, left: oldLeft, width: oldWidth, height: oldHeight } = this.copyGroupElements[index].style;
        //移动时
        if (source === 'move') {
          setStyle(oldTop + diff_top, item.style, 'top');

          setStyle(oldLeft + diff_left, item.style, 'left');
        }
        //吸附
        if (source === 'absorb') {
          if (top !== undefined) {
            const disTop = +(this.curEditGroup.style.top - top).toFixed(0);
            item.style.top = disTop == 0 ? item.style.top : item.style.top - disTop;
          }
          if (left !== undefined) {
            const disLeft = +(this.curEditGroup.style.left - left).toFixed(0);
            item.style.left = disLeft == 0 ? item.style.left : item.style.left - disLeft;
          }
        }
        //放大缩小
        if (source === 'zoom') {
          const disTop = oldTop - cpTop;
          const disLeft = oldLeft - cpLeft;
          const newWidth = (width * oldWidth) / cpWidth;
          const newHeight = (height * oldHeight) / cpHeight;
          item.style.width = newWidth;
          item.style.height = newHeight;
          item.style.top = disTop == 0 ? top : top + (disTop * height) / cpHeight;
          item.style.left = disLeft == 0 ? left : left + (disLeft * width) / cpWidth;
        }
      });
    },
    setCurEditElementStyle({ top, left, width, height }: position): void {
      setStyle(top, this.curEditElement.style, 'top');
      setStyle(left, this.curEditElement.style, 'left');
      setStyle(width, this.curEditElement.style, 'width');
      setStyle(height, this.curEditElement.style, 'height');
    },
    setElementsByMenuEvent(eventType:string){
      const index = this.elements.findIndex(item=>item.uid == this.curEditElement.uid)
      const eventObject = {
        del:()=>this.elements.splice(index,1),
        up:()=>{
          if(index === this.elements.length-1) return console.log('已经到顶了')
          this.elements.splice(index+1,1,...this.elements.splice(index,1,this.elements[index+1]))
        },
        down:()=>{
          if(index === 0) return console.log('已经到底了')
          this.elements.splice(index-1,1,...this.elements.splice(index,1,this.elements[index-1]))
        },
        top:()=>{
          if(index === this.elements.length-1) return console.log('已经到顶了')
          this.elements.splice(this.elements.length-1,1,...this.elements.splice(index,1,this.elements[this.elements.length-1]))
        },
        bottom:()=>{
          if(index === 0) return console.log('已经到底了')
        this.elements.splice(0,1,...this.elements.splice(index,1,this.elements[0]))
        },
        clear:()=>{
          this.elements = []
        }
      }
      eventObject[eventType]()
    }
  }
});

function setStyle(value, source, key) {
  if (value !== undefined && !isNaN(value) && value !== null) return (source[key] = value);
}
export function useEditorStoreHook() {
  return useEditorStore(store);
}
