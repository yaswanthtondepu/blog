import React from "react";
import { useEffect, useState } from "react";
import { AiFillHome,AiFillDatabase, } from "react-icons/ai";
import {BsFillBookmarkFill} from "react-icons/bs"
 
import { Link } from "react-router-dom";

const SideBar = () => {
  const [user,setUser] = useState(null);
  useEffect(() => {
    document.title = "BlogYY";
    JSON.parse(sessionStorage.getItem('user')) ? setUser(JSON.parse(sessionStorage.getItem('user'))) : setUser(null)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const useritems = [
    ["Home", "/",<AiFillHome/>], ["MyPosts", "/myposts",<AiFillDatabase/>], ["Bookmarks", "/bookmarks",<BsFillBookmarkFill/>]
  ]
  const guestitems=[["Home", "/",<AiFillHome/>]]
  return (


    <div className="flex flex-col content-end pl-20 pt-5 pr-10">
      <div className="flex flex-col ">
        {
        !user ?

        guestitems.map((item) => {
          return(<Link to={item[1]} key ={item[0]}className="py-2 px-4 text-xl flex flex-row items-center hover:bg-gray-800 hover:text-white hover:rounded-lg">
            <div style={{fontSize:"1.5rem"}}> {item[2]}</div>
            <div className="px-4">{item[0]}</div>
          </Link>)
        })
        :
        useritems.map((item) => {
          return(<Link to={item[1]} key ={item[0]}className="py-2 px-4 text-xl flex flex-row items-center hover:bg-gray-800 hover:text-white hover:rounded-lg">
            <div style={{fontSize:"1.5rem"}}> {item[2]}</div>
            <div className="px-4">{item[0]}</div>
          </Link>)})


      
      }
      </div>
    </div>
  );
};

export default SideBar;
