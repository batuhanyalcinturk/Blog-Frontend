import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./Post.scss";
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";

export default function PostForm(props) {

    const { title, summary, text, userName, userId, postId } = props;


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
            </Card>
        </div>
    )
}