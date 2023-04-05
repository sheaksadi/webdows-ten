import {useFetch} from "nuxt/app";
import axios from "axios";

export default defineEventHandler(async (e) => {
    const body = await readBody(e)
    console.log( body.url)
    let data = await $fetch(body.url+"")
    console.log(data)
    return data

})