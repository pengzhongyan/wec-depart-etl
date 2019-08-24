const PRODUCT = process.env.NODE_ENV == "production";
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    //打包文件的前缀
    publicPath: PRODUCT ? "/wec-depart-etl" : "./",
    //打包输出目录
    outputDir: "../webapp",
    chainWebpack: config => {
        config.resolve.alias.set("@styles", resolve("src/styles"));
        config.resolve.alias.set("@views", resolve("src/views"));
        config.resolve.alias.set("@api", resolve("src/api"));
        config.resolve.alias.set("@pages", resolve("src/pages"));
        config.resolve.alias.set("@mixins", resolve("src/mixins"));
        config.resolve.alias.set("@filters", resolve("src/filters"));
        config.resolve.alias.set("@components", resolve("src/components"));
        config.resolve.alias.set("@assets", resolve("src/assets"));
        config.resolve.alias.set("@utils", resolve("src/utils"));
        config.resolve.alias.set("@data", resolve("src/data"));
        config.resolve.alias.set("@store", resolve("src/store"));
    },
    productionSourceMap: false,
    pages: {
        index: {
            // page 的入口
            entry: "./src/main",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            title: "数据集成"
        }
    },
    css: {
        loaderOptions: {
            stylus: {
                preferPathResolver: "webpack",
                paths: [path.join(__dirname, "src/styles")],
                import: ["global.styl"]
            }
        }
    },
    devServer: {
        //本地开发代理地址
        proxy: {
            "/wec-depart-etl": {
                target: "http://iwecloud11:31148", //马拉松开发环境
                //target: "http://iwecloud11:31704", //zj
                changeOrigin: true
            }
        }
    }
};
