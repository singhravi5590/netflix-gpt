import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const Appstore = configureStore(
    {
        reducer : {
            user : userSlice
        }
    }
)

export default Appstore