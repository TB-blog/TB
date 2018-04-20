import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${type}-view`,

    asyncData ({ store, route }) {
      switch (type) {
        case 'blog':
          return store.dispatch('FETCH_ISSUES', {
            page: route.fullPath.split('/')[2] || 1,
            size: 10
          })
          break

        case 'repo':
          return store.dispatch('FETCH_REPOS')
          break
        default:
          break
      }
    },

    title: camelize(type),

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
