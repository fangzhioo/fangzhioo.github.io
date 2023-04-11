
<script setup>
import { data as posts } from './blog.data'
</script>

# My Blog

<ul>
<li v-for="post of posts">
    <a :href="post.url">{{ post.frontmatter.title }}</a>
</li>
</ul>