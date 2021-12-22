import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        scroll-behavior: smooth;
    }

    /* ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,.55);
        border-radius: 10px;
        margin: 2px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    } */

    *, *::after, *::before{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body{
        position: relative;
        background: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.textColor};
        min-height: 100vh;
        font-family: 'Roboto', sans-serif;
        /* transition: all 0.1s linear; */
    }

    textarea, pre {
        font-family: 'Roboto', sans-serif;
    }

    pre {
        white-space: pre-wrap;       /* Since CSS 2.1 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -pre-wrap;      /* Opera 4-6 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;   
    }

    button {
        border: 0;
        outline: 0;
    }

    ul {
        list-style: none;
    }
`;
