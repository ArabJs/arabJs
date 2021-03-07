import buble from "rollup-plugin-buble"

export default {
  entry: "src/index.js",
  moduleName: "arabJs-parser",
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ],
  sourceMap: true,
  targets: [
    {dest: "dist/arabJs-parser.js", format: "umd"},
    {dest: "dist/arabJs-parser.mjs", format: "es"}
  ]
}
