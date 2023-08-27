import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import { IStorageMethods, IStorageItems } from '../Interfaces/iStorage'

export type IUseStorage = {
    method: IStorageMethods,
    payworth: IStorageItems | null
    isFetching: boolean
}

export default function useStorage(watch?: "@PayWorth", deps?: any): IUseStorage {

    const [payworth, setItems] = useState<IStorageItems | null>(null)
    const [isFetching, setIsFteching] = useState<boolean>(false)

    const delItem: IStorageMethods['delItem'] = async (key) => {
        await AsyncStorage.removeItem(key)
        await fetchStorage('@PayWorth')
    }
    const getItem: IStorageMethods['getItem'] = async (key) => {
        const item = await AsyncStorage.getItem(key)
        return JSON.parse(item || 'null') as IStorageItems
    }

    const fetchStorage = async (key: "@PayWorth") => {
        setIsFteching(true)
        const items = await getItem(key)
        setItems(items)
        setIsFteching(false)
    }

    const setItem: IStorageMethods['setItem'] = async (key, item, payload) => {
        const data = { ...payworth, [key as string]: { ...payworth?.[key], [item]: payload } }
        await AsyncStorage.setItem("@PayWorth", JSON.stringify(data))
        await fetchStorage('@PayWorth')
    }

    const setObjectItem: IStorageMethods['setObjectItem'] = async (key, payload) => {
        const data = { ...payworth, [key as string]: { ...payworth?.[key], ...payload } }
        await AsyncStorage.setItem("@PayWorth", JSON.stringify(data))
        await fetchStorage('@PayWorth')
    }

    useEffect(() => {
        if (watch)
            fetchStorage('@PayWorth')

        return () => {
            setIsFteching(true)
        }
    }, [deps])

    return {
        method: {
            getItem,
            setItem,
            delItem,
            setObjectItem
        },
        payworth,
        isFetching
    }
}