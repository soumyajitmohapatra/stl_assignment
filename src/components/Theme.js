import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#F6F8FA",
  fontColor: "#000",
  boxBackground: "#fff",
  titleColor:"#EFEFEF",
  pageBackground:"#000"

};

export const darkTheme = {
  body: "#06090F",
  fontColor: "#fff",
  boxBackground: "#161B22",
  titleColor:"#EFEFEF",
  pageBackground:"#EA4C89" 
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
    transition: all .5s ease;
	}
`;
