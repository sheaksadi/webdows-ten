import { defineStore } from 'pinia'

export const webStore = defineStore('storeId', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            screen: null,
            isScreenMounted: false,

        }
    },
})