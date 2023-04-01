<script setup>

import Window from "../window";


let screen = ref(
    "Sheaksadi Webdows [Version 10.0.19044.2728]\n" +
    "(c) Sheak Sadi. All rights reserved.\n" +
    "type 'help' for a list of commands\n"
)
let inputText = ref("")
const commands = {
  help: {
    description: "Shows all commands",
    run: () => {
      let help = []
      for (const command in commands) {
        help.push(command + " - " + commands[command].description)
      }
      return  help
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

}

onMounted(() => {
  // setInterval(() => {
  //   caret.value = caret.value === "▁" ? "" : "▁"
  // }, 550)
});


function runCommand() {
  let command = inputText.value.split(" ")
  console.log(commands)
  console.log(commands[command[0]])
  if (commands[command[0]]) {
    let texts = commands[command[0]].run()
    if (!texts) return
      addText(texts)

  } else {
    addText("\n" +"'"+command[0]+"'" + " is not recognized as an internal or external command,\n" +
        "operable program or batch file."
    )
  }
  inputText.value = ""
}


function addText(texts) {
  if (!Array.isArray(texts)) texts = [texts]

    let text = texts.join("\n")
    let i = 0;
    screen.value += "\nC:\\Users\\SheakSadi>" + inputText.value + "\n"
    let interval = setInterval(() => {
      screen.value += text[i]
      i++
      if (i >= text.length) {
        screen.value += "\n"
        clearInterval(interval)
      }
    }, 10)

}



</script>

<template>
  <Window title="Command Prompt" header-color="bg-gray-900" header-select-color="bg-black" icon="ph:terminal-fill">
    <div class="w-full h-full bg-slate-1000 text-gray-300 leading-[1.05] console" style="white-space: pre;">
      {{screen}}
      <br>
      C:\Users\SheakSadi>
      <input
          type="text"
          class="bg-slate-1000 text-gray-300 text-sm w-full console-input w-full"
          style="outline: none; border: none;"
          v-model="inputText" @keydown.enter="runCommand"
      >
<!--      <span class="text-sm w-2">{{caret}}</span>-->
    </div>
  </Window>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap');

.console{
  font-family: 'Inconsolata', monospace;
}

</style>