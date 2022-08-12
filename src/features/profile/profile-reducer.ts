import {authAPI} from "../auth/authAPI";
import {AppThunk} from "../../app/store";
import {setIsLoggedInAC, setLoginErrorStatusAC} from "../auth/auth-reducer";
import {setAppStatusAC} from "../../app/app-reducer";

let initialState = {
    value: '',
    status: false,
}
type InitialStateType = typeof initialState;

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const logoutAC = () =>  ({type: "LOG_OUT_VALUE"}) as const

export const logoutThunkAC = (): AppThunk => async dispatch => {

    try {
        dispatch(setAppStatusAC('loading'))
        await authAPI.logout()
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
    } catch(e: any) {
        dispatch(setLoginErrorStatusAC(e.response.data.error))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsLoggedInAC(false))
    }
}

export type ProfileActionsType = ReturnType<typeof logoutAC>

// export const editAvatarAC = (data: UpdateUserType) => {
//     return {
//         type: 'CHANGE_AVATAR_MODE',
//         data
//     } as const
// }




// export const editAvatarThunkAC = (data: UpdateUserType): AppThunk => (dispatch) => {
//     authAPI.updateUser(data).then((res) => {
//
//             dispatch(setUserAC(res.data))
//         }
//     )
//
//
// }

