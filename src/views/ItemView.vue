<style lang="stylus">
@import './ItemView.styl';
</style>

<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <h1>{{ item.title }}</h1>
        <span v-if="item.labels" class="labels" v-for="label in item.labels" :key="label.id">
          <a :href="labelUrl + label.name"
            target="_blank"
            rel="noopener">#{{ label.name }}</a>
        </span>
        <p class="meta">
          Post By
          <a :href="`https://github.com/${this.$_config.user}`" target="_blank" rel="noopener">
            {{this.$_config.nickname}}
          </a>
          {{ item.created_at | timeAgo }}
        </p>
      </div>
      <div v-if="item.body" class="content" v-html="htmlResource" v-highlight></div>
      <div class="item-view-footer">
        <p class="meta">
          Updated {{ item.updated_at | timeAgo }}
        </p>
      </div>
      <div id="item-view-comments"></div>
    </template>
  </div>
</template>
