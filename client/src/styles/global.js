import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        scroll-behavior: smooth;
    }

    .simplebar-scrollbar::before {
        background-color: ${({ theme }) => theme.subTextColor} !important;
    }

    #scroll-node {
        scroll-behavior: smooth;

    }

    .infinite-scroll-component {
        overflow: hidden !important;
    }

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

    body, html {
        height :100%;
    }

    #root {
        height: 100%;
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
