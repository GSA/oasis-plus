import { defineCollection} from 'astro:content';
import { glob, file } from "astro/loaders";


const nav = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/nav" })
})

const data = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/data" })
})

const about = defineCollection({})
const buyersguide = defineCollection({})
const community = defineCollection({})
const contact = defineCollection({})
const eventstraining = defineCollection({})
const resources = defineCollection({})
const sellersguide = defineCollection({})


export const collections = { 
    about,
    buyersguide,
    community,
    contact,
    data,
    eventstraining,
    nav,
    resources,
    sellersguide
};
