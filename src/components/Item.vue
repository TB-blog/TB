<template>
  <li class="news-item">
    <span v-if="type === 'blog'" class="score">23</span>
    <span class="score">{{ item.stargazers_count }}</span>
    <span class="title">
      <template v-if="type === 'blog'">
        <a rel="noopener">{{ item.title }}</a>
      </template>
      <template v-else>
        <a :href="'https://github.com/HuangXiZhou/' + item.name" target="_blank">
          <span v-if="item.fork">
            <svg class="repo-forked-icon" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z">
              </path>
            </svg>
          </span>
          {{ item.name }}
        </a>
      </template>
    </span>
    <br>
    <span class="meta">
      <template v-if="type === 'blog'">
        <span class="time">
          {{ item.created_at | timeAgo }}
        </span>
        <span class="comments-link">
          | <router-link :to="'/item/' + item.number">{{ item.descendants }} Read more</router-link>
        </span>
      </template>
      <template v-else>
        <span class="time">
          {{ item.description }}
        </span><br>
        <span v-if="item.license" class="time">
          {{ item.license.name }}
        </span>
      </template>
    </span>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item', 'type']
}
</script>

<style lang="stylus">
.news-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .score
    color #ff0000
    font-size 1.1em
    font-weight 700
    position absolute
    top 50%
    left 0
    width 80px
    text-align center
    margin-top -10px
  .meta, .labels
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600

.repo-forked-icon
  vertical-align middle
  padding-bottom .2em
</style>
