import React, { useState } from "react";
import { Button, CardContent, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function CommentForm(props) {
    const { userId, userName, postId } = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : localStorage.getItem("tokenKey"),
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (

        <CardContent>

            <OutlinedInput
                id="outlined-adorment-amount"
                multiline
                inputProps={{ maxLenght: 5 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={{ pathname: '/users/' + userId }}>
                            <Typography variant="subtitle2">
                                {userName}
                            </Typography>
                        </Link>
                    </InputAdornment>
                }

                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="outlined"
                            onClick={handleSubmit}
                        >Yorum Yap</Button>
                    </InputAdornment>
                }
                value = {text}
            >
            </OutlinedInput>

        </CardContent>
    )
}