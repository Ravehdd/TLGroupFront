import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Employee = {
        "id": number,
        "full_name": string,
        "salary": number,
        "subdivision": string,
        "subdivision_id": number,
        "role": string,
        "role_id": number,
        "hiring_date": string
}

type EmployeeID = number

type EmployeeState = {
    entities: Record<EmployeeID, Employee>
    ids: EmployeeID[]
}

const initialState: EmployeeState = {
    entities: {},
    ids: []
}

export const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    selectors: {
        selectAllEmployees: state => state.entities
    },
    reducers: {
        storeEmployee: (state, action: PayloadAction<{employee: Employee[]}>) => {
            const {employee} = action.payload
            return {
                ...state,
                entities: employee.reduce((acc, emp) => {
                    acc[emp.id] = emp
                    return acc
                }, {} as Record<EmployeeID, Employee>),
                ids: employee.map(emp => emp.id)
        }}
}
})
