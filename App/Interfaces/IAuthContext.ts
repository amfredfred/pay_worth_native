import { IAuth } from "./iStorage"

export type IAuthContextData = {
    user: {
        isAuthenticated?: boolean,
        person: "isAuthenticated" | "isOffline" | "isNew",
        profileUri?: string
    }
}
export type IAuthContextMethods = {
    register?(): Promise<boolean>
    login?(): Promise<boolean>
    logout?(): Promise<boolean>
    confirmNumber?(): Promise<boolean>
}