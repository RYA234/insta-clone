import React, {useEffect, useState} from "react";
import { DotsCircleHorizontalIcon, DotsHorizontalIcon,HeartIcon,ChatIcon,BookmarkIcon, EmojiHappyIcon} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"

import {db} from "../firebase";
import { addDoc,collection, serverTimestamp,onSnapshot,orderBy,query,getDocs} from "firebase/firestore";
import Moment from "react-moment";

export default function Post({img,userImg,caption,username,id}){
    const { data:session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    async function sendComment(event){
        event.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db,"posts",id,"comments"),{
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    };
    
    
    const fetchDataa = async () => {
        console.log("dasdsdsa")
        const q = query(collection(db, "posts",id,"comments"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());        
        });
        setComments(querySnapshot.docs);
    };
    fetchDataa(); 
    return(
        <div className="bg-white my-7 border rounded-md">
            <div className="flex items-center p-5">
                <img className="h--12 rounded-full object-cover border p-1 mr-3" src={userImg} alt={username} />  
                <p className="font-bold flex-1">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            <img className="object-cover w-full" src={img} alt=""/>
            {session && (
                <div className="flex justify-between px-4 pt-4">     
                    <div className="flex space-x-4">
                        <HeartIcon className="btn"/>
                        <ChatIcon className="btn"/>
                    </div>
                    <BookmarkIcon className="btn"/>
                </div>
            )}
            <p className="p-5 truncate"><span className="font-bold mr-2">{username}</span>{caption}</p>
            {comments.length > 0 &&(
                <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
                    {comments.map(comment => (
                        <div className="flex items-center space-x-2 mb-2">
                            <img className="h-7 rounded-full object-cover" src={comment.data().userImage} alt="user-image" />
                            <p className="font-semibold">{comment.data().username}</p>
                            <p className="flex-1 truncate">{comment.data().comment}</p>
                            <Moment fromNo>{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    ))}
                </div>
            )}
            {session &&(
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7"/>
                    <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)} 
                        className="border-none flex-1 focus:ring-0"
                        type="text" 
                        placeholder="Enter your comment...."/>
                    <button
                        type="submit"
                        onClick={sendComment}
                        disabled={!comment.trim()} 
                        className="text-blue-400 font-bold disabled:text-blue-200" 
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    );
}

