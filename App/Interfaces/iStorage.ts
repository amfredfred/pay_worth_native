import { IAuthContextData } from "./IAuthContext"

export interface IAuth {
    stage?: "landing" | "register" | "login" | "confirmPhone" | "confirmPassword"
    fullName?: string
    email?: string
    phone?: string
    password?: string
    confirmPassword?: string
    referralCode?: string
    username?: string
}
export interface IAppStates {
    inAuthState?: boolean
    isHeaderHidden?: boolean
    isNavigationTabsHiddeh?: boolean
}
export interface IStorageItems {
    user: IAuthContextData['user']
    states: IAppStates
    authing: IAuth
}
export type IStorageKeys = keyof IStorageItems

// Please do not touch, unless you know what you are doing !!!
export type IPayloadKeys<T extends IStorageKeys> = T extends IStorageKeys ? keyof IStorageItems[T] : never
export type IPayloadType<T extends IStorageKeys, P extends IPayloadKeys<T>> = P extends keyof IStorageItems[T] ? IStorageItems[T][P] : never

export interface IStorageMethods {
    setItem?<K extends IStorageKeys, P extends IPayloadKeys<K>>(
        key: K,
        item: P,
        payload: IPayloadType<K, P>
    ): void
    setObjectItem?<K extends IStorageKeys>(
        key: K,
        objectPayload: IStorageItems[K]
    ): void
    delItem?(key: "@PayWorth"): Promise<void>
    getItem?(key: "@PayWorth"): Promise<IStorageItems>
}