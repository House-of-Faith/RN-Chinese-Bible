import { isEqual } from "lodash";

export const initialState = {
    storeRehydrated: false,
    theme: "light",
    language: "english", // simplified, traditional
    fontSize: "medium",
    showDropdown: false,
    currentScripture: {
        testament: "old", // new
        book: 0,
        chapter: 0,
    },
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SET_CURRENT_SCRIPTURE":
            return setCurrentScripture(state, payload);
        case "LIGHT_THEME":
            return { ...state, theme: "light" };
        case "DARK_THEME":
            return { ...state, theme: "dark" };
        case "SET_LANGUAGE":
            return setLanguage(state, payload);
        case "REHYDRATE_STORE":
            return rehydrateStore(state, payload);
        case "SET_FONT_SIZE":
            return { ...state, fontSize: payload };
        case "SHOW_DROPDOWN":
            return { ...state, showDropdown: true };
        case "HIDE_DROPDOWN":
            return { ...state, showDropdown: false };
        default:
            return { ...state };
    }
}

function setLanguage(state, payload) {
    const language = payload?.trim().toLowerCase();
    const isValid = ["simplified", "traditional", "english"].includes(language);
    if (isValid) return { ...state, language };
    return { state };
}

function setCurrentScripture(state, payload) {
    const testament = payload?.testament;
    const book = payload?.book;
    const chapter = payload?.chapter;

    const isValid =
        ["old", "new"].includes(testament) &&
        typeof book === "number" &&
        typeof chapter === "number";

    const oldScripture = state.currentScripture;
    const newScripture = payload;

    if (isEqual(oldScripture, newScripture)) return { ...state };
    if (!isValid) return { ...state };

    return { ...state, currentScripture: newScripture };
}

function rehydrateStore(state, payload) {
    if (!payload) {
        return { ...state };
    }
    return { ...payload, storeRehydrated: true };
}
