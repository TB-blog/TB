<template>
  <div class="list-view" :class="{ 'repos-view': type === 'repo' }">
    <section class="description">
      <p>A man who loves the world.</p>
      <p style="display: inline">
        Find me on
        <a class="icon" target="_blank" href="https://github.com/HuangXiZhou" title="github"><i class="fa fa-github"></i></a>,
        <a class="icon" target="_blank" href="https://www.linkedin.com/in/huangxizhou" title="linkedin"><i class="fa fa-linkedin"></i></a> and
        <a class="icon" target="_blank" href="https://steamcommunity.com/profiles/76561198360491627" title="steam"><i class="fa fa-steam"></i></a>
      </p>
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

<script>
import Item from '../components/Item.vue'

export default {
  name: 'list',

  components: {
    Item
  },

  props: {
    type: String
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.type === 'blog' ? this.$store.getters.issues : this.$store.getters.repos
    }
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      return this.$store.state.maxPage
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  beforeMount () {
    if (this.$root._isMounted && this.type === 'blog') {
      this.loadItems(this.page)
    }
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems (to = this.page, from = -1) {
      this.$bar.start()
      this.$store.dispatch('FETCH_ISSUES', {
        page: this.page,
        size: 10
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.type}/1`)
          return
        }
        this.transition = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.getters.issues
        this.$bar.finish()
      })
    }
  }
}
</script>

<style lang="stylus">
.repos-view
  padding-top 4px

.list-nav, .list
  border-radius 2px

.description
  padding 15px 30px
  // position absolute
  text-align left
  // top 0
  // left 0
  // right 0
  a:hover
    color #d480aa

.list-nav
  padding 15px 30px
  // position absolute
  text-align left
  // top 60px
  // left 0
  // right 0
  a
    color #3eaf7c
    // margin 0 1em
  span
    margin 0 1em
  .disabled
    color #444

.list
  // position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .list
    margin 10px 0
</style>
