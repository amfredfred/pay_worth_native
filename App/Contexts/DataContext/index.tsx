import React, { useReducer, createContext, useContext } from 'react'
import { IAppDataContext, IAppDataContextMethods } from '../../Interfaces/Interfaces'
import useStorage from '../../Hooks/useStorage'

const initialState: IAppDataContext = {
    authing: {},
    user: {
        person: 'isNew'
    },
    states: {}
}

const DataContext = createContext<{
    states: IAppDataContext,
    setData: IAppDataContextMethods['setItem'],
    setObjectItem?: IAppDataContextMethods['setObjectItem']
}>({ states: initialState, setData: () => "DEFAULT" as any })

export const useDataContext = () => useContext(DataContext)

interface IDispatch {
    type: any,
    key: any,
    item: any,
    payload: any
}


export default function DataContextProvider({ children }: { children: React.ReactNode }) {
    const { method, payworth } = useStorage("@PayWorth")
    const dataReducer = (state: any, { type, key, item, payload }: IDispatch): IAppDataContext => {
        const data = { ...state, [key]: { ...state?.[key], [item]: payload } }
        method.setItem?.(key, item, payload)
        return data
    }

    const [states, dispatch] = useReducer(dataReducer, { ...initialState, ...payworth })
    const setData: IAppDataContextMethods['setItem'] = async (key, item, payload) => {
        dispatch({ type: '', key, item, payload })
    }

    const setObjectItem: IAppDataContextMethods['setObjectItem'] = async (key, payload) => {
        method?.setObjectItem?.(key, payload)
        console.log("DataContextProvider -> ", key, payload)
    }


    return (
        <DataContext.Provider value={{ states, setData, setObjectItem }}>
            {children}
        </DataContext.Provider>
    )
}
