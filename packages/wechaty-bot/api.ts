import axios from 'axios'

const isDocker = process.env['WECHATY_DOCKER'] === '1'

const api = axios.create({
    baseURL: isDocker ? 'http://nest:3000' : 'http://localhost:3000'
})

export { api }
