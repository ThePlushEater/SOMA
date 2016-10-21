import { combineReducers } from "redux";

import localization from "./localizationReducer";
import character from "./characterReducer";
import backgrounds from "./backgroundsReducer";
import actors from "./actorsReducer";
import texts from "./textsReducer";

import layout from "./layoutReducer";


export default combineReducers({
  localization,
  layout,
});
