import type { StateCreator } from "zustand"
import type { FavoritesSliceType } from "./favoritesSlice"

type Notification = {
    text: string,
    error: boolean,
    show: boolean
}

export type NotificationsSliceType = {
    notification: Notification,
    showNotification: (payload:Pick<Notification, 'text' | 'error'>) => void, /* Utilizamos un (Pick) para seleccionar solo los que necesitamos de este Type */
    hideNotification: () => void
}

export const createNotificationSlice:StateCreator<NotificationsSliceType & FavoritesSliceType, [], [], NotificationsSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => { /* Cerramos la notification despues de 5 segundos */
            get().hideNotification()
        }, 5000)
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})