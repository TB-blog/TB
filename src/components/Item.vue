<style lang="stylus">
@import './Item.styl';
</style>

<template>
  <li class="blogs-item" :class="{ 'list-item-left': type === 'blog' }">
    <span class="score">{{ item.stargazers_count }}</span>
    <span class="title">
      <template v-if="type === 'blog'">
        <a rel="noopener">{{ item.title }}</a>
      </template>
      <template v-else>
        <a :href="`https://github.com/${this.$_config.user}/` + item.name" target="_blank" rel="noopener">
          {{ item.name }}
        </a>
      </template>
    </span>
    <br>
    <span class="meta">
      <template v-if="type === 'blog'">
        <span class="time">
          {{ item.created_at | timeFormat }}
        </span>
        <span>
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
