import { combineReducers } from "redux";

import localization from "./localizationReducer";
import layout from "./layoutRecuder";

export default combineReducers({
  localization,
  layout,
});
