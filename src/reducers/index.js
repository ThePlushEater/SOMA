import { combineReducers } from "redux";

import localization from "./localizationReducer";
import character from "./characterReducer";
import backgrounds from "./backgroundsReducer";


export default combineReducers({
  localization,
  character,
  backgrounds,
});
