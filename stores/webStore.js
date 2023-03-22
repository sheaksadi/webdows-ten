import {defineStore} from 'pinia'
import {createApp, defineAsyncComponent} from "vue"

export const webStore = defineStore('webStore', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            screen: null,
            isScreenMounted: false,
            winMount: null,
            Window: null,
            apps: [
                {
                    name: "cv",
                    title: "Cv",
                    icon: "mdi:file-document-outline",
                }
            ],
            openedApps: {}

        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        openApp(name) {

            console.log(name)
            let app = null
            for (const a of this.apps) {
                if (a.name === name) {
                    app = a
                }
            }
            console.log(app.name)
            let component = defineAsyncComponent(() => import(`../components/windows/window-${app.name}.vue`))
            let uuid = this.uuid()
            let vueApp = createApp(component, {uuid})
            console.log("wm", this.winMount);
            console.log(vueApp)
            if (this.winMount) {
                let element = this.Window.document.createElement("div")
                // element.classList.add('w-full')
                // element.classList.add('h-full')

                vueApp.mount(element)
                this.winMount.appendChild(element)
                this.openedApps[uuid] = {}
                this.openedApps[uuid].instance = vueApp
                this.openedApps[uuid].status = "open"
                this.openedApps[uuid].app = app
            }
        },
        uuid() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
    },
})