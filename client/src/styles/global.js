import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::after, *::before{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body{
        background: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.textColor};
        min-height: 100vh;
        font-family: 'Roboto', sans-serif;
        transition: background 0.2s ease-out;
    }

    textarea, pre {
        font-family: 'Roboto', sans-serif;
    }
    
    html {
    overflow: scroll;
    overflow-x: hidden;
    }

    ::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }

`;
