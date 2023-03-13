/*
 * @Author: WangXin
 * @Date: 2023-02-21 10:49:04
 * @LastEditors: WangXin
 * @LastEditTime: 2023-02-21 16:25:36
 * @FilePath: \pnpm-demo\src\api\user.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by YuXing, All Rights Reserved. 
 */
import { http } from "@/utils/http";
/** 根据姓名/电话/是否启用模糊获取用户信息 */
export const getUserInfoLikeNameAndPhoneAndIsUse = (data?: object) => {
    return http.request<any>("/getUserInfoLikeNameAndPhoneAndIsUse",'GET',data,true);
};
/** 新增用户信息 */
export const insertUserInfo = (data?: object) => {
    return http.request<any>("/insertUserInfo",null,data);
};
/** 修改用户信息 */
export const updateUserInfo = (data?: object) => {
    return http.request<any>("/updateUserInfo",'PUT',data);
};
/** 重置用户密码 */
export const resetPasswordById = (data?: object) => {
    return http.request<any>("/resetPasswordById",'PUT',data);
};
/** 用户修改登录密码 */
export const updatePassword = (data?: object) => {
    return http.request<any>("/updatePassword",'PUT',data);
};
/** 用户修改权限 */
export const updateUserPower = (data?: object) => {
    return http.request<any>("/updateUserPower",'PUT',data);
};
/** 删除用户 */
export const deleteUserById = (data?: object) => {
    return http.request<any>("/deleteUserById",'PUT',data);
};