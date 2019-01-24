import styled, { CreateStyled } from "@emotion/styled";

export interface Theme {
	color: {
		primary: string;
		secondary: string;
		alternate: string;
		secondary_darker: string;
		highlight: string;
	};
	text: {
		primary: string;
		primary_darker: string;
		link: string;
	};
}

export const dotaBuff: Theme = {
	color: {
		primary: "#1C242D",
		secondary: "#242F39",
		alternate: "rgba(255, 255, 255, 0.04)",
		secondary_darker: "rgb(32, 42, 51)",
		highlight: "blue"
	},
	text: {
		primary: "#EEE",
		primary_darker: "#AAA",
		link: "#A9CF54"
	}
};

export default styled as CreateStyled<Theme>;
