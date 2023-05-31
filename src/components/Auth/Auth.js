import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {

    let navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", username);
            })
            .catch((err) => console.log(err));
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        console.log(localStorage)
        navigate(0)
    }


    return (
        <FormControl>
            <InputLabel>Kullanıcı Adı</InputLabel>
            <Input onChange={(e) => handleUsername(e.target.value)} />
            <InputLabel style={{ top: 80 }}>Şifre</InputLabel>
            <Input
                type="password"
                style={{ top: 40 }}
                onChange={(e) => handlePassword(e.target.value)}
            />
            <Button
                variant="outlined"
                style={{ marginTop: 60 }}
                onClick={(() => handleButton("register"))}>Kayıt Ol</Button>
            <FormHelperText style={{ margin: 20 }}>
                Zaten Üye Misin?
            </FormHelperText>
            <Button
                variant="outlined"
                onClick={(() => handleButton("login"))}>Giriş Yap</Button>
        </FormControl>
    )
}

export default Auth;