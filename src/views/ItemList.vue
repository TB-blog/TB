<style lang="stylus">
@import './ItemList.styl';
</style>

<template>
  <div class="list-view" :class="{ 'repos-view': type === 'repo' }">
    <section class="bio">
      <blockquote>
        <p>{{ user.bio ? user.bio : 'A man who loves the world.' }}</p>
      </blockquote>
    </section>
    <div v-if="type === 'blog'" class="list-nav">
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
    <template v-else-if="!displayedItems.length && page <= maxPage">
      <div class="empty-item">
        <h1>Congratulations!</h1>
        You launched
        <a href="https://github.com/TB-blog/TB" target="_blank" rel="noopener">TB</a> successfully,
        but it looks like you have not yet created a new issue.
        If you are the admin, please click
        <a :href="`https://github.com/${this.$_config.user}/${this.$_config.repo}/issues/new`" target="_blank" rel="noopener">here</a>
        to start.<br>
        If you created a new issue successfully,
        please use <code>Ctrl C</code> and <code>tb run</code> or <code>tb deploy</code> to reload TB.
      </div>
    </template>
    <template v-else>
      <div class="empty-item">
        <h1>Sorry...</h1>
        There is nothing, you can click
        <a :href="`https://github.com/${this.$_config.user}`" target="_blank" rel="noopener">here</a>
        to check my Github profile and have a reset.
      </div>
    </template>
    <template v-if="!displayedItems.length && type === 'repo' && page <= maxPage">
      <div class="empty-issue">
        <h1>Sorry...</h1>
        There is no repository, you can click
        <a :href="`https://github.com/${this.$_config.user}`" target="_blank" rel="noopener">here</a>
        to check my profile or see my
        <router-link to="/blog">blogs</router-link>.
      </div>
    </template>
  </div>
</template>
