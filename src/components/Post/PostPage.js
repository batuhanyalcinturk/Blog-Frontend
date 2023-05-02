import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";

function PostPage(props) {

    const { title, summary, userName, userId, postId } = props;
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    }

    return (
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
                    <IconButton>
                        <CommentIcon />
                    </IconButton>
                    
                </CardActions>
            </Card>
    )
}

export default PostPage;