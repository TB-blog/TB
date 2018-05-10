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
    <template v-if="displayedItems.length">
      <transition :name="transition">
        <div class="list" :key="displayedPage" v-if="displayedPage > 0">
          <transition-group tag="ul" name="item">
            <item v-for="item in displayedItems" :key="item.id" :item="item" :type="type">
            </item>
          </transition-group>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="empty-issue">
        Congratulations on your successful launch of the
        <a href="https://github.com/TB-blog/TB" target="_blank" rel="noopener">TB</a>,
        but it looks like you have not yet created a new issue.
        If you are the admin, please click
        <a :href="`https://github.com/${this.$_config.user}/${this.$_config.repo}/issues/new`" target="_blank" rel="noopener">here</a>
        to start.<br>
        If you created new issue successfully, please use <code>Ctrl C</code> and <code>tb run</code> to reload TB.
      </div>
    </template>
  </div>
</template>
