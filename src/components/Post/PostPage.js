import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

function PostPage() {

    const { postId } = useParams();
    const [liked, setLiked] = useState(false);
    const [post, setPost] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);

    const handleLike = () => {
        setLiked(!liked);
    }

    const refreshComments = () => {
        fetch("/comments?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const listingPost = () => {
        fetch(`/posts/${postId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPost(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }

    useEffect(() => {
        listingPost();
        refreshComments();
    }, [postId, commentList])

    if (error) {
        return <div> Error !!! </div>
    } else if (!isLoaded) {
        return <div> Loading... </div>
    } else {
        return (
            <div className="app">
                <Card sx={{ maxWidth: 1500 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.text}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton
                            onClick={handleLike}
                            aria-label="add to favorites">
                            <FavoriteIcon style={liked ? { color: "red" } : null} />
                        </IconButton>
                        <IconButton>
                            <Container fixed>
                                {error ? "error" :
                                    isLoaded ? commentList.map(comment => (
                                        <Comment userId={1} userName={"USER"} text={comment.text} ></Comment>
                                    )) : "Loading"}
                                <CommentForm userId = {1} userName = {"USER"} postId = {postId}></CommentForm>
                            </Container>
                            <CommentIcon />
                        </IconButton>

                    </CardActions>
                </Card>
            </div>
        )
    }

}

export default PostPage;