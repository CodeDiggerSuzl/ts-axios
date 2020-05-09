# 需求分析
## Features
- 使用`XMLHttpRequest` 对象进行通讯
- 支持 Promise API
- 支持请求和相应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON数据的自动转换
- 客户端防止 XSRF(TODO)

## Init Project

Init the project with TypeScript library stater.

Usage:
```sh
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios

npm install
```

### Source file dir

```
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件
└── tslint.json // TypeScript lint 文件
```

### Integrated Tools
- 使用 RollupJS 帮助我们打包。
- 使用 Prettier 和 TSLint 帮助我们格式化代码以及保证代码风格一致性。
- 使用 TypeDoc 帮助我们自动生成文档并部署到 GitHub pages。
- 使用 Jest帮助我们做单元测试。
- 使用 Commitizen帮助我们生成规范化的提交注释。
- 使用 Semantic release帮助我们管理版本和发布。
- 使用 husky帮助我们更简单地使用 git hooks。
- 使用 Conventional changelog帮助我们通过代码提交信息自动生成 change log。

## Write Basic Request Code

Client send request to server with `XMLHttpRequest` object,server get the request and response.


### Create Entry file


### Send Request with `XMLHttpRequest`
