const _config = require('../../config.json');

function getTitle(vm: any) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this);
    if (title) {
      (this as any).$ssrContext.title = `${_config.user} | ${title}`;
    }
  },
};

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = `${_config.user} | ${title}`;
    }
  },
};

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin;
