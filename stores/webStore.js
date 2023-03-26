import {defineStore} from 'pinia'
import {createApp, defineAsyncComponent} from "vue"

export const webStore = defineStore('webStore', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            isDeviceMobile: false,
            screen: null,
            isScreenMounted: false,
            winMount: null,
            Window: null,
            selectedWindow: "",
            mouseDragging: false,
            moveAbleElements: [],
            vueExtensionWarning: false,
            apps: [
                {
                    name: "cv",
                    title: "Cv",
                    icon: "mdi:file-document-outline",
                },
                {
                    name: "contact",
                    title: "Contact",
                    icon: "ic:outline-email",
                },
                {
                    name: "vsCode",
                    title: "VS Code",
                    icon: "vscode-icons:file-type-vscode",
                }
            ],
            openedApps: {}

        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        openApp(name) {


            let app = null
            for (const a of this.apps) {
                if (a.name === name) {
                    app = a
                }
            }

            let component = defineAsyncComponent(() => import(`../components/windows/window-${app.name}.vue`))
            let uuid = crypto.randomUUID()
            let vueApp = createApp(component, {uuid})

            if (this.winMount) {
                let element = this.Window.document.createElement("div")
                element.classList.add('absolute')
                element.classList.add('top-0')
                element.classList.add('left-0')



                vueApp.mount(element)
                this.winMount.appendChild(element)

                console.log("ast",element);
                console.log("ast",element.getBoundingClientRect().width);

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
                element.parentNode.classList.remove('transition-all')
                element.parentNode.classList.remove('duration-100')
                element.parentNode.classList.remove('ease-linear')
                console.log(element.parentNode.classList)
                window.document.onmouseup = closeDragElement;
                if (Boolean(e.target.closest(".no-drag"))) return
                that.mouseDragging = true
                e.preventDefault()
                pos3 = e.clientX;
                pos4 = e.clientY;

                // call a function whenever the cursor moves:
                window.document.onmousemove = elementDrag;
                console.log("srgrg",e.target.getBoundingClientRect().left)

            }

            function elementDrag(e) {

                if (that.openedApps[element.parentNode.dataset.uuid].isFullscreen) {
                    // console.log(e.target.getBoundingClientRect().width)
                    // console.log("''''''''''''")
                    return
                }
                element.parentNode.classList.remove('transition-all')
                element.parentNode.classList.remove('duration-100')
                element.parentNode.classList.remove('ease-linear')
                e.preventDefault()

                // if (that.openedApps[element.parentNode.dataset.uuid].isFullscreen) {
                //     that.openedApps[element.parentNode.dataset.uuid].isFullscreen = false
                //     console.log("pos 1", pos1)
                //     console.log("pos 2", pos2)
                //     console.log("pos 3", pos3)
                //     console.log("pos 4", pos4)
                //     // let posPercent = (e.clientX - e.target.getBoundingClientRect().left / e.target.getBoundingClientRect().width) * 1000
                //     pos3 = ((e.clientX - e.target.getBoundingClientRect().left) / that.openedApps[element.parentNode.dataset.uuid].minWidth) * 740;
                //     pos4 = e.clientY;
                //
                //     console.log((e.clientX))
                //     console.log(e.target.getBoundingClientRect().left)
                //     console.log((e.clientX - e.target.getBoundingClientRect().left))
                //     console.log(e.target.getBoundingClientRect().width)
                //     console.log(that.openedApps[element.parentNode.dataset.uuid].minWidth)
                //     console.log("''''''''''''")
                //     console.log("pos 1", pos1)
                //     console.log("pos 2", pos2)
                //     console.log("pos 3", pos3)
                //     console.log("pos 4", pos4)
                //     element.parentNode.style.top = "400px";
                //     element.parentNode.style.left = "400px";
                //
                // }else {
                //
                // }


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
                // element.parentNode.classList.remove('transition-all')
                // element.parentNode.classList.remove('duration-200')
                // element.parentNode.classList.remove('ease-linear')
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