import {defineStore} from 'pinia'
import {createApp, defineAsyncComponent} from "vue"
import {useFetch} from "nuxt/app";

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
            catPic: "",
            showStartMenu: false,
            showCalendar: false,
            showNotificationMenu: false,
            isNotificationMenuOpen: false,
            apps: [
                {
                    name: "aboutMe",
                    title: "About Me",
                    icon: "mdi:file-document-outline",
                    isAppAboutMe: true,
                    imgPath: "/assets/icons/imageres_102-5.png"
                },
                {
                    name: "console",
                    title: "Command Prompt",
                    icon: "ph:terminal-fill",
                    isAppAboutMe: false
                },
               {
                    name: "contact",
                    title: "Contact",
                    icon: "ic:outline-email",
                    isAppAboutMe: true
                },
                {
                    name: "vsCode",
                    title: "VS Code",
                    icon: "vscode-icons:file-type-vscode",
                    isAppAboutMe: false
                },
                {
                    name: "rickRoll",
                    title: "Rick Roll",
                    icon: "mdi:warning",
                    isAppAboutMe: false,
                    invisible: true
                },

            ],
            openedApps: {},
            fileSystem: {
                "C:": {
                    "Users": {
                        "SheakSadi": {
                            children:{

                            },
                            type: "folder",
                        },
                        type: "folder",
                    },
                    type: "folder",
                }
            }

        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function

        atScreenClick(e) {
            console.log("click")
            //notification menu
            if (!Boolean(e.target.closest(".notification-menu-not-close")) && this.showNotificationMenu) {
                if (this.showNotificationMenu) {
                    this.showNotificationMenu = false
                    setTimeout(async () => {
                        if (!this.showNotificationMenu) {
                            this.isNotificationMenuOpen = false
                            this.catPic = await useFetch('https://api.thecatapi.com/v1/images/search').data
                        }
                    }, 500)
                }
            }
            //start menu
            if (!Boolean(e.target.closest(".start-menu-not-close")) && this.showStartMenu) {
                if (this.showStartMenu) {
                    this.showStartMenu = false
                }
            }
            //calendar
            if (!Boolean(e.target.closest(".calender-not-close")) && this.showCalendar) {
                if (this.showCalendar) {
                    this.showCalendar = false
                }
            }


        },


        openApp(name) {


            const app = this.apps.find((a) => a.name === name);
            if (!app) return;

            let component = defineAsyncComponent(() => import(`../components/windows/window-${app.name}.vue`))
            let uuid = crypto.randomUUID()
            let vueApp = createApp(component, {uuid})

            if (this.winMount) {
                let element = this.Window.document.createElement("div")
                element.classList.add('h-full', 'w-full', 'absolute', 'top-0', 'left-0');
                element.style.width = "100%"
                element.style.height = "100%"


                vueApp.mount(element)
                this.winMount.appendChild(element)

                console.log("ast", element);
                console.log("ast", element.getBoundingClientRect().width);

                this.openedApps[uuid] = {
                    instance: vueApp,
                    status: "open",
                    app,
                    isFullScreen: false,
                };
                this.selectedWindow = uuid
            }
        },
        mouseMoveHandler(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            element.onmousedown = mouseDown
            let that = this

            function mouseDown(e) {
                element.parentNode.classList.remove('transition-all', 'duration-[50ms]', 'ease-linear');
                window.document.onmouseup = closeDragElement;
                if (Boolean(e.target.closest(".no-drag"))) return
                that.mouseDragging = true
                e.preventDefault()
                pos3 = e.clientX;
                pos4 = e.clientY;

                // call a function whenever the cursor moves:
                window.document.onmousemove = elementDrag;
                console.log("srgrg", e.target.getBoundingClientRect().left)

            }

            function elementDrag(e) {
                if (that.openedApps[element.parentNode.dataset.uuid].isFullscreen) return
                element.parentNode.classList.remove('transition-all', 'duration-[50ms]', 'ease-linear');
                e.preventDefault()


                // calculate the new cursor position:

                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:

                element.parentNode.style.top = (element.parentNode.offsetTop - pos2) + "px";
                element.parentNode.style.left = (element.parentNode.offsetLeft - pos1) + "px";

            }

            function closeDragElement() {
                that.mouseDragging = false
                if (element.parentNode.offsetTop - pos2 < 0) {
                    that.openedApps[element.parentNode.dataset.uuid].isFullscreen = true
                    element.parentNode.style.top = "0px"
                    that.openedApps[element.parentNode.dataset.uuid].minWidth = element.parentNode.getBoundingClientRect().width
                }

                window.document.onmouseup = null;
                window.document.onmousemove = null;
            }

        }

    },
})