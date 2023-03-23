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
            selectedWindow: "",
            mouseDragging: false,
            moveAbleElements: [],
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
            let uuid = crypto.randomUUID()
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
                this.openedApps[uuid].isFullScreen = false
                this.selectedWindow = uuid
            }
        },
        mouseMoveHandler(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            element.onmousedown = mouseDown
            let that = this
            function mouseDown(e) {
                if (Boolean(e.target.closest(".no-drag"))) return
                console.log(e.target)
                that.mouseDragging = true
                e.preventDefault()
                pos3 = e.clientX;
                pos4 = e.clientY;
                window.document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                window.document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e.preventDefault()
                if (that.openedApps[element.parentNode.dataset.uuid].isFullscreen) {
                    that.openedApps[element.parentNode.dataset.uuid].isFullscreen = false
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                }
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                element.parentNode.style.top = (element.parentNode.offsetTop - pos2) + "px";
                element.parentNode.style.left = (element.parentNode.offsetLeft - pos1) + "px";


                // console.log("parent", )
            }

            function closeDragElement() {
                that.mouseDragging = false
                if (element.parentNode.offsetTop - pos2 < 0) {
                    that.openedApps[element.parentNode.dataset.uuid].isFullscreen = true
                    element.parentNode.style.top = "0px"
                }
                // stop moving when mouse button is released:
                window.document.onmouseup = null;
                window.document.onmousemove = null;
            }

        }
        // uuid() {
        //     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        //         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        //     );
        // }
    },
})