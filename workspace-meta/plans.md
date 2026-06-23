# Resume Website Plan

- [x] 建立隔离目录 `workspace-meta` 与 `generated-site`
- [x] 创建工作流文档 `plans.md` 与 `agents.md`
- [x] 完成首次 Git 基线备份
- [x] 在 `generated-site` 下初始化 React + Vite 项目
- [x] 搭建全局页面结构与数据模型
- [x] 实现 Hero 首屏，包含视频背景、导航、联系按钮
- [x] 实现个人经历模块，包含介绍、联系方式、项目与科研经历
- [x] 实现精选项目模块，大卡片展示作品
- [x] 实现个人优势模块，卡片展示能力
- [x] 实现底部整屏联系收尾页
- [x] 适配 PC 端版心，控制在约 1700px
- [x] 运行构建与基础检查
- [x] 完成自审并回写工作流文档

## 2026-06-24 Lanyard Widget Integration

- [x] 在 Hero 区域确定挂件接入位置
- [x] 评估 React Bits 原版 `Lanyard` 依赖与当前仓库兼容性
- [x] 在 `generated-site/src` 实现 lanyard 风格个人挂件组件
- [x] 使用 `img/Ziqian.jpg` 替换挂件主图
- [x] 为挂件增加高级感边框、金属细节、姓名与简介信息
- [x] 运行 `npm run lint` 验证代码质量
- [x] 运行 `npm run build` 验证产物可构建
- [x] 完成改动后的自查与文档更新

## 2026-06-24 Lanyard Interaction Fix

- [x] 修复挂件缺少鼠标交互的问题
- [x] 增加基于指针位置的倾斜、摆动与高光反馈
- [x] 移除导致说明卡遮挡挂件的负外边距布局
- [x] 再次运行 `npm run lint` 与 `npm run build`
