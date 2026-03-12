import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import UserInfo from "../components/user_info";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../hooks/data_fetch";
import { getAuthData } from "../../apis/api_setup";
import { useEffect } from "react";
import { addAuthData } from "../store";

export function Structure ({sideMenu}){

    return <>
        <UserInfo/>
        <Sidebar menu={sideMenu} />
        <Outlet/>
    </>
}