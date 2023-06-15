import React from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import "./Home.scss";
import { useState } from "react";
import { useEffect } from "react";


function Home(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    
    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        refreshPosts();
    },[postList])

    

    if(error){
        return <div> Error !!! </div>
    }else if(!isLoaded){
        return <div> Loading... </div>
    }else{
        return (
            <>
              {localStorage.getItem("currentUser") == null ? (
                ""
              ) : (
                <PostForm
                  userId={localStorage.getItem("currentUser")}
                  userName={localStorage.getItem("userName")}
                  refreshPosts={refreshPosts}
                />
              )}
          
              {postList.map((post) => (
                <Post
                  likes={post.postLikes}
                  postId={post.id}
                  userId={post.userId}
                  userName={post.userName}
                  summary={post.summary}
                  title={post.title}
                  text={post.text}
                ></Post>
              ))}
            </>
          );
    }

}

export default Home;