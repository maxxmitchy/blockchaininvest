import React, { useState, useEffect } from "react";
import Axios from "axios";

const Loading = () => {
    const [message, setMessage] = useState({
        completeMessage: "STEP BY STEP EARNING...",
        text: "",
        isEnded: false,
        typingSpeed: 60
    });

    useEffect(() => {
        let timer = "";
        const handleWriter = () => {
            setMessage(currentState => ({
                ...currentState,
                text: getCurrentText(currentState)
            }));
            timer = setTimeout(handleWriter, message.typingSpeed);
        };
        handleWriter();
        return () => clearTimeout(timer);
    }, [message.isEnded]);

    useEffect(() => {
        let timer = "";
        if (!message.isEnding && message.text === message.completeMessage) {
           timer =  setTimeout(() => {
                setMessage(currentState => ({
                    ...currentState,
                    isEnded: true
                }));
            }, 400);
        } else if (message.isEnded && message.text === "") {
            setMessage(currentState => ({
                ...currentState,
                isEnded: false,
                message: getNewMessage(currentState)
            }));
        }
        return () => clearTimeout(timer);
    }, [message.isEnded, message.completeMessage, message.text]);

    function getCurrentText(currentState) {
        return currentState.isEnded
            ? currentState.completeMessage.substring(
                  0,
                  currentState.text.length - 1
              )
            : currentState.completeMessage.substring(
                  0,
                  currentState.text.length + 1
              );
    }

    function getNewMessage(currentState) {
        // Axios.get("http://127.0.0.1:8000/api/message")
        //     .then(res => {
        //         console.log(res.data.message);
        //         setMessage({
        //             ...currentState,
        //             title: res.data.message.name,
        //             date: res.data.message.created_at,
        //             completeMessage: res.data.message.description,
        //             isEnded: false
        //         });
        //     })
        //     .catch(error => console.log(error));
    }

    return <b style={{ color: "#041466" }}>{message.text}</b>;
};

export default Loading;
