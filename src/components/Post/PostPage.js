import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Link, useParams } from "react-router-dom";

function PostPage() {

    const { title, summary, text, userName, userId, postId } = useParams();
    const [liked, setLiked] = useState(false);
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //const [postList, setPostList] = useState([]);

    const handleLike = () => {
        setLiked(!liked);
    }

    const onePost = () => {
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
        onePost();
    }, { postId })

    if (error) {
        return <div> Error !!! </div>
    } else if (!isLoaded) {
        return <div> Loading... </div>
    } else {
        return (
            <div className="app">
                <div>
                    <Card sx={{ maxWidth: 500 }}>
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
                                <CommentIcon />
                            </IconButton>

                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }

}

export default PostPage;