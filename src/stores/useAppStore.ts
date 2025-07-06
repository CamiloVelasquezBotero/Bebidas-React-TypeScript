import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { type FavoritesSliceType, createFavoritesSlice } from './favoritesSlice.ts'
import { type NotificationsSliceType, createNotificationSlice } from './notificationSlice.ts'
import { type AiSliceType, createAiSlice } from './aiSlice.ts'

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationsSliceType & AiSliceType>()(devtools((...a) => ({ /* (...a) tomamos una copia de set, get etc... para pasarselo a nuestro slice */
    ...createRecipesSlice(...a), /* Añadimos nuestro slice a nuestro store principal */
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAiSlice(...a)
})))