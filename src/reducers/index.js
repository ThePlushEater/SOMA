import { combineReducers } from "redux";

import localization from "./localizationReducer";
import layout from "./layoutReducer";
import sprite from "./spriteReducer";


export default combineReducers({
  localization,
  layout,
  sprite,
});
