
import React from 'react';
import Post from "./Post";
import {useEffect,useState} from "react";
import {collection,onSnapshot, orderBy, query,getDocs} from "firebase/firestore";
import {db} from "../firebase";
import { getMetadata } from "firebase/storage";

export default   function Posts(){
    const [posts, setPosts] = useState([]);
    const [abc,setAbc]  = useState(0);
    
        const fetchData = async () => {
            const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
            });
            const postData = querySnapshot.docs.map((doc) => doc.data());
            setPosts(postData);
            console.log(posts);

            console.log(postData);
        };
        fetchData();       
    return(
        <div>
            aaa
            {posts.map((post)=>(
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.profileImg}
                    img={post.image}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}