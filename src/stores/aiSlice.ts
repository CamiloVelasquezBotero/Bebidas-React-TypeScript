import type { StateCreator } from "zustand";
import AiService from "../services/AIService";

export type AiSliceType = {
    recipe: string,
    isGenerating: boolean,
    generateRecipe: (prompt:string) => Promise<void>
}

export const createAiSlice:StateCreator<AiSliceType> = (set) => ({
    recipe: '',
    isGenerating: false,
    
    generateRecipe: async (prompt) => {
        /* Reiniciamos la reeta generada en cada consulta */
        set({recipe: '', isGenerating: true})
        const data = await AiService.generateRecipe(prompt)

        for await (const textPart of data) {
            set((state) => ({
                // Copiamos los que ya vamos teniendo y le sumamos lo nuevo y vamos agregando
                recipe: state.recipe + textPart
            }))
        }
        set({isGenerating: false})
    }
})