<style lang="stylus">
@import './ItemList.styl';
</style>

<template>
  <div class="list-view" :class="{ 'repos-view': type === 'repo' }">
    <section class="description">
      <p>{{ this.$_config.motto }}</p>
    </section>
    <div v-show="type === 'blog'" class="list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">PREV</router-link>
      <a v-else class="disabled">PREV</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">NEXT</router-link>
      <a v-else class="disabled">NEXT</a>
    </div>
    <transition :name="transition">
      <div class="list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item" :type="type">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>
