import React from "react";
import { CardContent, InputAdornment, OutlinedInput, Typography} from "@mui/material";
import { Link } from "react-router-dom";


export default function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <CardContent>

            <OutlinedInput
                disabled
                id="outlined-adorment-amount"
                multiline
                inputProps={{ maxLenght: 5 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={{ pathname: '/users/' + userId }}>
                            <Typography variant="subtitle2">
                                {userName}
                            </Typography>
                        </Link>
                    </InputAdornment>
                }
            >

            </OutlinedInput>

        </CardContent>
    )
}