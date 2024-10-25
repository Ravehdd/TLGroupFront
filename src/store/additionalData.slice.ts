import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Subdivision = {
    id: number,
    subdiv_name: string
}

type Role = {
    id: number,
    role_name: string
}

type AdditionalData = {
    subdivision: Subdivision[],
    role: Role[]
}


const initialState: AdditionalData = {
    subdivision: [],
    role: []
}


export const additionalDataSlice = createSlice({
    name: "additionalData",
    initialState: initialState,
    selectors: {
        selectSubdivision: state => state.subdivision,
        selectRole: state => state.role
    },
    reducers: {
        storeSubdivision: (state, action: PayloadAction<{subdivision: Subdivision[]}>) => {
            const {subdivision} = action.payload
            return {
                ...state,
                subdivision: subdivision
            }
        },
        storeRole: (state, action: PayloadAction<{role: Role[]}>) => {
            const {role} = action.payload
            return {
                ...state,
                role: role
            }
        }

    }}
)