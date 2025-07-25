import PineconeRouter from 'pinecone-router'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import mask from '@alpinejs/mask'
import establishPineconeRouter from './utils/PineconeRoutes'
import './components/header/header'

Alpine.plugin(persist)
Alpine.plugin(mask)
Alpine.plugin(PineconeRouter)

document.addEventListener('alpine:init', () => {
    establishPineconeRouter(Alpine.$router)
});

Alpine.start()