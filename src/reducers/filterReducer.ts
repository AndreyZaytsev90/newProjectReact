import {FilterValuesType} from "../App";


export const filterReducer = (state: FilterValuesType, action: FilterReducerActionsType) : FilterValuesType => {
    switch (action.type) {
        case "CHANGE-FILTER" : {
            return action.payload.value
        }
    }
}
type FilterReducerActionsType = ChangeFilterACType

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType)=> {
    return {
        type: "CHANGE-FILTER",
        payload: {value}
    } as const
}

