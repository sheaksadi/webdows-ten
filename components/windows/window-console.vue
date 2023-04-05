<script setup>

import Window from "../window";
import {webStore} from "/stores/webStore.js";

const store = webStore();


let screen = ref(
    "Sheaksadi Webdows [Version 10.0.19044.2728]\n" +
    "(c) Sheak Sadi. All rights reserved.\n" +
    "type 'help' for a list of commands\n"
)
let inputText = ref("")
let thisWindow = ref(null)
let inputField = ref(null)
let consoleScreen = ref(null)

let currentPath = ref("C:\\Users\\SheakSadi")
let history = []

const commands = {
    help: {
        description: "Shows all commands",
        run: () => {
            let help = []
            for (const command in commands) {
                help.push(command + " - " + commands[command].description)
            }
            return help
        }
    },
    cls: {
        description: "Clears the screen",
        run: () => {
            screen.value = ""
            inputText.value = ""
        }
    },
    echo: {
        description: "Prints text",
        run: () => {
            return inputText.value.split(" ").slice(1).join(" ")
        }
    },
    whoami: {
        description: "Prints the current user",
        run: () => {
            return "SheakSadi"
        }
    },
    time: {
        description: "Prints the current time",
        run: () => {
            return new Date().toLocaleTimeString()
        }
    },
    date: {
        description: "Prints the current date",
        run: () => {
            return new Date().toLocaleDateString()
        }
    },
    cat: {
        description: "Prints the content of a file",
        run: () => {
            let path = inputText.value.split(" ")[1]
            let file = getPathObj(getPathObj(store.fileSystem, currentPath.value), path)
            console.log(file)
            if (!file) return "File not found"
            if (file.content === undefined) return "File is not a text file"
            if (file.content === "") return "File is empty"
            return file.content
        }
    },
    touch: {
        description: "Creates a new file",
        run: () => {
            let name = inputText.value.split(" ")[1]
            let currentDir = getPathObj(store.fileSystem, currentPath.value)
            let file = getPathObj(getPathObj(store.fileSystem, currentPath.value), name)
            if (file) return "File already exists"
            currentDir.children[name] = {
                name: name,
                type: "file",
                content: "",
            }
            console.log(store.fileSystem.children["C:"].children.Users.children.SheakSadi.children)

            return "File created"
        }
    },
    ls: {
        description: "Lists all files and folders in the current directory",
        run: () => {
            let currentDir = getPathObj(store.fileSystem, currentPath.value)
            let files = []
            for (const file in currentDir.children) {
                files.push(file)
            }
            return files
        }
    },
    nano: {
        description: "Opens a text editor",
        run: () => {
            let name = inputText.value.split(" ")[1]
            if (!name) return "Please specify a file"
            let currentDir = getPathObj(store.fileSystem, currentPath.value)
            let file = getPathObj(getPathObj(store.fileSystem, currentPath.value), name)
            if (!file) return "File not found"
            if (file.content === undefined) return "File is not a text file"
            let terminal = thisWindow.value.firstChild
            thisWindow.value.removeChild(terminal)

            let editor = document.createElement("textarea");

            editor.classList.add("w-full", "h-full", "bg-slate-1000", "text-gray-300", "leading-[1.05]", "console", "overflow-y-scroll", "overflow-x-hidden", "relative")
            editor.textContent = file.content

            thisWindow.value.appendChild(editor)
            editor.focus()
            const exitNano = () => {
                let content = editor.value
                let file = getPathObj(getPathObj(store.fileSystem, currentPath.value), name)
                file.content = content
                thisWindow.value.removeChild(editor)
                thisWindow.value.appendChild(terminal)
                inputField.value.focus()
                addText("File saved")
            };

            editor.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    exitNano();
                }
            });


        }
    },
    rm: {
        description: "Deletes a file",
        run: () => {
            let name = inputText.value.split(" ")[1]
            let currentDir = getPathObj(store.fileSystem, currentPath.value)
            let file = getPathObj(getPathObj(store.fileSystem, currentPath.value), name)
            if (!file) return "File not found"
            if (file.content === undefined) return "File is not a text file"
            delete currentDir.children[name]
            return "File deleted"
        }
    },


}
let historyIndex = 0

onMounted(() => {
    thisWindow.value.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            if (historyIndex < history.length) {
                inputText.value = history[history.length - historyIndex - 1]
                historyIndex++
            }
        }
    });
    thisWindow.value.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
            if (historyIndex > 0) {
                historyIndex--
                inputText.value = history[history.length - historyIndex - 1]
            }
        }
    });
    thisWindow.value.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            e.preventDefault()
            let command = inputText.value.split(" ")[0]
            let possibleCommands = []
            for (const cmd in commands) {
                if (cmd.startsWith(command)) possibleCommands.push(cmd)
            }
            if (possibleCommands.length === 1) {
                inputText.value = possibleCommands[0]
            } else if (possibleCommands.length > 1) {
                addText(possibleCommands)
            }
        }
    });
    setTimeout(() => {
        demoCommand("help" )
    }, 400);


});
function demoCommand(text, callback) {
    let i = 0
    let interval = setInterval(() => {
        inputText.value += text[i]
        i++
        consoleScreen.value.scrollTop = consoleScreen.value.scrollHeight

        if (i >= text.length) {
            runCommand()
            if (callback) callback()

            consoleScreen.value.scrollTop = consoleScreen.value.scrollHeight
            clearInterval(interval)
        }
    }, 250)
}

function runCommand() {
    if (isRendering.value) return
    if (inputText.value === "") {
        addText("")
        consoleScreen.value.scrollTop = consoleScreen.value.scrollHeight
        return
    }
    history.push(inputText.value)
    historyIndex = 0
    let command = inputText.value.split(" ")
    if (commands[command[0]]) {
        let texts = commands[command[0]].run()

        if (!texts) {
            inputText.value = ""
            consoleScreen.value.scrollTop = consoleScreen.value.scrollHeight

            return
        }
        addText(texts)

    } else {
        addText(["'" + command[0] + "'" + " is not recognized as an internal or external command,",
            "operable program or batch file."]
        )
    }
    inputText.value = ""
}

let isRendering = ref(false)
function addText(texts) {
    if (!Array.isArray(texts)) texts = [texts]
    let text = texts.join("\n")
    let i = 0
    if (text === "") {
        screen.value += "\n" + currentPath.value + ">"
        return
    }
    screen.value += "\n" + currentPath.value + ">" + inputText.value + "\n\n"
    isRendering.value = true
    let interval = setInterval(() => {
        screen.value += text[i]

        i++
        consoleScreen.value.scrollTop = consoleScreen.value.scrollHeight

        if (i >= text.length) {
            screen.value += "\n"
            consoleScreen.value.scrollTop = consoleScreen.value.scrollHeight
            isRendering.value = false
            clearInterval(interval)
        }
    }, 10)

}

function getPathObj(obj, paths) {
    paths = paths.split("\\")
    for (const path of paths) {
        obj = obj.children[path]
    }
    return obj
}


function atConsoleClick() {
    inputField.value.focus()
}

</script>

<template>
    <Window title="Command Prompt" header-color="bg-gray-900" header-select-color="bg-black" icon="ph:terminal-fill">
        <div class=" w-full h-full bg-slate-1000 " ref="thisWindow" @click="atConsoleClick">
            <div class="w-full h-full  text-gray-300 leading-[1.05] console overflow-y-scroll overflow-x-hidden"
                 ref="consoleScreen"
                 style="white-space: pre;">
                {{ screen }}
                <div class="w-full flex">
                    {{ currentPath }}>
                    <input
                            type="text"
                            class="bg-slate-1000 text-gray-300 text-sm grow console-input w-full "
                            style="outline: none; border: none;"
                            ref="inputField"
                            v-model="inputText" @keydown.enter="runCommand"
                    >
                </div>

            </div>
        </div>

    </Window>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap');

.console {
    font-family: 'Inconsolata', monospace;
}

</style>