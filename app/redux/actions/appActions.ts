import { AppActions } from "./../types/appTypes";
import { createAction } from "@reduxjs/toolkit";

const resetApp = createAction(AppActions.RESET_APP);

export { resetApp };
