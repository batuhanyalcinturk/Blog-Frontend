import React, { useEffect, useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Collapse from '@mui/material/Collapse';
import "./Post.scss";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {

    const { title, summary, userName, userId, postId, likes } = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike();
            setLikeCount(likeCount + 1)
        }else{
            deleteLike();
            setLikeCount(likeCount - 1)
        }
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

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

    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("/likes/" + likeId, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const checkLikes = () => {
        var likeControl = likes.find((like) => like.userId === userId)
        if(likeControl != null){
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
        
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            refreshComments();
        }
    }, [commentList])

    
    useEffect(() => {checkLikes()},[])


    return (
        <div className="postContainer">
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Link to={{ pathname: '/users/' + userId }}>
                        <Typography variant="subtitle2">
                            {userName}
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        {summary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                    </IconButton>
                    {likeCount}
                     
                    <Link to={{ pathname: '/posts/' + postId }}>
                        Devamını Oku
                    </Link>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                        {error? "error":
                        isLoaded? commentList.map(comment => ( 
                            <Comment userId = {1} userName = {"USER"} text = {comment.text} ></Comment>
                        )) : "Loading"}
                        <CommentForm userId = {1} userName = {"USER"} postId = {postId}></CommentForm>
                    </Container>
                </Collapse>
            </Card>
        </div>
    )
}