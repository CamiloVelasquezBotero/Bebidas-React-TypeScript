import type { StateCreator } from 'zustand'
import type { Recipe } from '../types'
import type { RecipesSliceType } from './recipeSlice'
import { createRecipesSlice } from './recipeSlice'
import { createNotificationSlice, type NotificationsSliceType } from './notificationSlice'

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe:Recipe) => void,
    favoriteExists: (id:Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice:StateCreator<FavoritesSliceType & RecipesSliceType & NotificationsSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            // Usamos la funcion de notificacion desde otro slice
            createNotificationSlice(set, get, api).showNotification({text: 'Eliminado De Favoritos', error: false}) 
        } else {
            set((state) => ({
                /* favorites: [...get().favorites, recipe] */
                favorites: [...state.favorites, recipe]
            }))
            // Usamos la funcion de notificacion desde otro slice
            createNotificationSlice(set, get, api).showNotification({text: 'Agregado a Favoritos', error: false})
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites)) /* Seteamos el localStorage */
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})