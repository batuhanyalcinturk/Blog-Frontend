import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./Post.scss";
import { Link } from "react-router-dom";
import { Alert, Button, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";

export default function PostForm(props) {

    const { userName, userId, refreshPosts } = props;
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    summary: summary,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setSummary("");
        setText("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }
    const handleSummary = (value) => {
        setSummary(value);
        setIsSent(false);
    }
    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (
        <div className="postContainer">
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Post başarılı bir şekilde eklendi!
                </Alert>
            </Snackbar>
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
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}
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
                            value={summary}
                            onChange={(i) => handleSummary(i.target.value)}
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
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button variant="outlined"
                                        onClick={handleSubmit}
                                    >Paylaş</Button>
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