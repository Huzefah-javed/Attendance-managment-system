import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import UserInfo from "../components/user_info";

export function Structure (){

    return <>
        <UserInfo/>
        <Sidebar/>
        <Outlet/>
    </>
}