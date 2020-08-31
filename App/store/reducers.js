import { isEqual } from 'lodash';

export const initialState = {
	theme: "light",
	language: "english", // simplified, traditional
	currentScripture: {
		testament: "old", // new
		book: 0,
		chapter: 0
	}
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
			case "LIGHT_THEME":
					return { ...state, theme: "light" };
			case "DARK_THEME":
					return { ...state, theme: "dark" };
			case "SET_LANGUAGE":
					return setLanguage(state, payload);
			case "SET_CURRENT_SCRIPTURE":
				return setCurrentScripture(state, payload);
			default:
					return { ...state };
	}
};

function setLanguage(state, payload) {
  const language = payload?.trim().toLowerCase();
  const isValid = ['simplified', 'traditional', 'english'].includes(language);
  if (isValid) return { ...state, language };
  return { state }
}

function setCurrentScripture(state, payload) {
  const testament = payload?.testament;
  const book = payload?.book;
	const chapter = payload?.chapter;
	
  const isValid = ['old', 'new'].includes(testament)
    && typeof book === 'number'
		&& typeof chapter === 'number';
	
	const oldScripture = state.currentScripture;
  const newScripture = payload;
	
	if (isEqual(oldScripture, newScripture)) return { ...state };
	if (!isValid) return { ...state }
	
	return { ...state, currentScripture: newScripture };
}