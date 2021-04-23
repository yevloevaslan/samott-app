import { createAction } from "@reduxjs/toolkit";
import { AppActions } from "utils";

export const resetApp = createAction(AppActions.RESET_APP);
