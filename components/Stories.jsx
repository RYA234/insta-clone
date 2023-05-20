

import {useEffect,useState} from "react";
import Story from "./Story";
import { UserCircleIcon } from "@heroicons/react/outline";


export default  function Stories(){
    const[storyUsers,setStoryUsers] = useState([]);
    
    useEffect(() =>{
        (async () => {
            const randomUsersResponse = await fetch(
                "https://randomuser.me/api/?results=20&inc=name,login,picture"
              ).then((res) => res.json());
              setStoryUsers(randomUsersResponse.results)
              
            })();    
        },[]);
        console.log(storyUsers.results);

        console.log("aa");
    
    // const randomUsersResponse = await fetch(
    //     "https://randomuser.me/api/?results=20&inc=name,login,picture"
    //   ).then((res) => res.json());
    
    //   setStoryUsers(randomUsersResponse);
    //   console.log(storyUsers);

      return(
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
            {storyUsers.map((user) => (
                <Story key={user.uuid} username={user.login.username} img={user.picture.medium } />
            ))}
        </div>
      )


}