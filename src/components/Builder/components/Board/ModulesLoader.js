import ReactDynamicImport from "../../dynamic-import";

const modulesList = ["Bar", "Foo"];


const ComponentLoader = f => import(`./modules/${f}/index.js`);

/**
 * Make sure to use ReactDynamicImport outside the render method,
 * else new component is rendered in each render
 *
 * You can choose to show a placeholder and render error component in case of error,
 * check API section for more
 */
export const modules = modulesList.reduce((p, c) => {
  return {
    ...p,
    [c]: ReactDynamicImport({
      name: c,
      loader: ComponentLoader
    })
  };
}, {});