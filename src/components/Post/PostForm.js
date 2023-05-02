import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Collapse from '@mui/material/Collapse';
import "./Post.scss";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostForm(props) {

    const { title, summary, text, userName, userId, postId } = props;
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <div className="postContainer">
            <Card sx={{ maxWidth: 800 }}>
                <CardContent>
                    <Link to={{ pathname: '/users/' + userId }}>
                        <Typography variant="subtitle2">
                            {userName}
                        </Typography>
                    </Link>
                    <Typography gutterBottom variant="h5" component="div">
                        {<OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder="Title"
                            inputProps={{ maxLenght: 5 }}
                            fullWidth
                        >

                        </OutlinedInput>}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder="Summary"
                            inputProps={{ maxLenght: 100 }}
                            fullWidth
                        >

                        </OutlinedInput>
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLenght: 250 }}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button variant="outlined">Paylaş</Button>
                                </InputAdornment>
                            }
                        >

                        </OutlinedInput>
                    </Typography>
                </CardContent>
                <CardActions>
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
                    <CardContent>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}