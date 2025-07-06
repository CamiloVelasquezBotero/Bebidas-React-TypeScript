import { streamText } from 'ai'
import { openRouter } from '../lib/ai'

export default {
    async generateRecipe(prompt:string) {
        const result = streamText({
            model: openRouter('meta-llama/llama-3.3-70b-instruct'), /* AI que usara */
            system: 'Eres un bartender muy profesional con muchos años de experiencia y ayudas a las personas a crear recetas de bebidas dependiendo a los ingredientes que te pregunten', /* Comportamiento */
            temperature: 1, /* 0 significa Muy determinista, numeros mas altos significa respuestas ma randoms */
            prompt
        })

        return result.textStream
    }
}