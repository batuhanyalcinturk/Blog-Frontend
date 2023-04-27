import React, { useState } from "react";
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

    const { title, summary, userName, userId, postId } = props;
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);



    const handleLike = () => {
        setLiked(!liked);
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


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
                        <FavoriteIcon style={liked ? { color: "red" } : null} />
                    </IconButton>
                    <Link to={{ pathname: '/posts/' + postId }}>
                        Devamını Oku
                    </Link>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon  />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}