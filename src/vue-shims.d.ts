declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare var System: any;

declare var require: NodeRequire;

declare var process: NodeJS.Process;

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare module "*.json" {
  const value: any;
  export default value;
}

interface Window {
__INITIAL_STATE__: any;
}
