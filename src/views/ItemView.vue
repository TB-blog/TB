<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <a>
          <h1>{{ item.title }}</h1>
        </a><br>
        <span v-if="item.labels" class="labels" v-for="label in item.labels" :key="label.id">
          #{{ label.name }}
        </span>
        <p class="meta">
          By Trevor | {{ item.created_at | timeAgo }}
        </p>
      </div>
      <div class="item-view-comments">
        <div class="content" v-html="htmlResource" v-highlight>

        </div>
      </div>
    </template>
  </div>
</template>

<script>
import hljs from 'highlightjs'
import marked from 'marked'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'item-view',
  components: { Spinner },

  data: () => ({
    loading: true
  }),

  directives: {
    highlight: {
      inserted: el => {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach(block => {
          hljs.highlightBlock(block)
        })
      }
    }
  },

  computed: {
    htmlResource () {
      return marked(this.item.body)
    },

    item () {
      if (this.$store.state.issues.length) {
        return this.$store.state.issues.filter(el => {
          return String(el.number) === this.$route.params.id
        })[0]
      }
      // console.log(a)
      return this.$store.state.singleIssue
    }
  },

  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('FETCH_SINGLEISSUE', { number: [id] })
  },

  title () {
    return this.item.title
  },

  mounted () {
    hljs.initHighlightingOnLoad()
  }
}
</script>

<style lang="stylus">
  @import './ItemView.styl';
</style>
