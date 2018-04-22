<template>
  <li class="news-item" :class="{ 'list-item-left': type === 'blog' }">
    <span class="score">{{ item.stargazers_count }}</span>
    <span class="title">
      <template v-if="type === 'blog'">
        <a rel="noopener">{{ item.title }}</a>
      </template>
      <template v-else>
        <a :href="'https://github.com/HuangXiZhou/' + item.name" target="_blank">
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
  padding 20px 30px 20px 80px
  position relative
  line-height 20px
  .score
    color #ffca2b
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
        color #d480aa

.list-item-left
  padding-left 28px

.repo-forked-icon
  vertical-align middle
  padding-bottom .2em
</style>
