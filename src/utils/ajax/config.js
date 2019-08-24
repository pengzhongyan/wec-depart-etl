import qs from "qs";
let headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
};

const axiosConfig = {
    baseURL: "./",
    headers,
    // 请求后的数据处理
    transformResponse: [
        function(data) {
            const response = typeof data === "object" ? data : JSON.parse(data);
            return response;
        }
    ],
    transformRequest: [
        function(data = {}) {
            return JSON.stringify(data);
        }
    ],
    //   查询对象序列化函数
    paramsSerializer: function(params) {
        return qs.stringify(params);
    },
    // 超时设置s
    timeout: 60000,
    // 跨域是否带Token
    withCredentials: false,
    responseType: "json",
    // xsrf 设置
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    // 最多转发数，用于node.js
    maxRedirects: 5,
    // 最大响应数据大小
    maxContentLength: 2000
};
export default axiosConfig;
