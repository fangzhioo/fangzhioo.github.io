// posts.data.js
import { createContentLoader } from 'vitepress'

const clearUrl = (url: string): string => {
    if (url.startsWith('/src')) {
        return url.replace('/src', '');
    }
    return url;
}

export default createContentLoader('src/posts/**/*.md',  {
    transform: (data) => {
        return data.map(i => ({
            ...i,
            url: clearUrl(i.url)
        }))
    }
}/* options */)