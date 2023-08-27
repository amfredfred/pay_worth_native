import React, { useReducer, createContext, useContext, useEffect } from 'react'
import useStorage from '../../Hooks/useStorage'
import { IAuthContextData, IAuthContextMethods } from '../../Interfaces/IAuthContext'
import * as Cellular from 'expo-cellular'
import { IAppDataContextMethods } from '../../Interfaces/Interfaces'



const initialState: IAuthContextData = {
    user: {
        isAuthenticated: false,
        person: 'isNew'
    },
}

const AuthContext = createContext<(IAuthContextData & IAuthContextMethods)>({
    ...initialState
})

export const useAuthContext = () => useContext(AuthContext)
interface IDispatch {
    type?: any,
    key: any,
    item?: any,
    payload: any
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const { method, payworth, isFetching } = useStorage("@PayWorth")

    const dataReducer = (state: any, { type, key, item, payload }: IDispatch): IAuthContextData => {
        const data = { ...state, [key as string]: { ...state?.[key], ...(payload || {}) } }
        method.setObjectItem?.(key, data)
        return data
    }

    const [states, dispatch] = useReducer(dataReducer, initialState)

    const setObjectItem: IAppDataContextMethods['setObjectItem'] = async (key, payload) => {
        dispatch({ key, payload })
    }

    const login: IAuthContextMethods['login'] = async () => {
        setObjectItem('user', { isAuthenticated: true, person: 'isAuthenticated' })
        return true
    }

    const register: IAuthContextMethods['register'] = async () => {
        console.log("regiter CALLED")
        return true
    }

    const confirmNumber: IAuthContextMethods['confirmNumber'] = async () => {
        console.log("confirmNumber")
        setObjectItem('user', { isAuthenticated: true, person: 'isAuthenticated' })
        return true
    }

    const logout: IAuthContextMethods['logout'] = async () => {
        console.log("logout CALLED")
        method?.delItem?.('@PayWorth')
        return true
    }

    useEffect(() => {

        const checkAuthStatus = async () => {
            try {
                // More logic goes here or there 🚀💫
                const netGen = Cellular.CellularGeneration

                if (!netGen.UNKNOWN) {
                    if (payworth?.user) {
                        console.log("Authenticcated")
                        //do something if user object is present
                        console.log("HAS USER OBJECT")
                        setObjectItem('user', payworth?.user)
                    }
                    else {
                        // the person may be new 
                        setObjectItem('user', { isAuthenticated: false, person: 'isNew' })
                    }
                } else {
                    // else this means the person is offliine or so...
                    setObjectItem('user', { ...payworth?.user, person: 'isNew' })
                }

            } catch (error) {
                console.error('Error while checking authentication status:', error)
            }
        }

        checkAuthStatus()

        return () => {
            // logout()
        }

    }, [payworth?.user.person])

    const data: (IAuthContextData & IAuthContextMethods) = {
        login, register, logout, confirmNumber,
        user: states.user,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
