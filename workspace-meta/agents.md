# Project Memory

## 项目概述
当前仓库用于构建个人简历网站。主站点位于 `generated-site/`，技术栈为 React + Vite；`workspace-meta/` 用来放工作流文档，避免打扰主项目结构。

## 目录结构
- `generated-site/`: React 简历站点源码与构建产物
- `generated-site/src/`: 页面组件、样式、静态导入资源
- `img/`: 用户提供的图片资源，当前包含 `Ziqian.jpg`
- `workspace-meta/`: `plans.md` 与 `agents.md` 等工作文档
- `CV.html`: 根目录下的独立静态简历文件，不是当前 React 站点入口

## 当前设计约束
- 优先保证 PC 端观感，同时兼顾响应式收缩
- 页面风格保持深色、克制、偏高端科技感
- Hero 区域需要承担首屏识别度和主视觉展示
- 工作文档统一维护在 `workspace-meta/` 中

## 当前实现状态
- 已完成单页 React 简历站点基础结构
- 已有 Hero、About、Projects、Strengths、Contact 等区块
- 2026-06-24 新增任务：在 Hero 合适位置接入 lanyard 风格挂件，使用 `img/Ziqian.jpg` 作为主图，并加入高质感边框、姓名与简介信息
- 该挂件已接入 Hero 右侧视觉列，构建与 lint 已通过
- 挂件现已支持鼠标悬停交互，说明卡也已调整为不遮挡挂件的正常布局

## 关于 React Bits Lanyard 说明
用户提供的是 React Bits 的 `Lanyard` 集成说明，但原版依赖以下内容：
- `three`
- `meshline`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `card.glb`
- `lanyard.png`

当前仓库没有 `card.glb` 和 `lanyard.png` 这两个关键资产。为避免引入不完整的 3D 依赖和不可控的接入风险，本轮实现采用现有页面系统内的等效 lanyard 风格挂件组件，而不是强行接入缺资源的原版 3D 组件。

## 运行与测试
```powershell
cd "C:\Users\asus\Desktop\My_CV\generated-site"
npm install
npm run dev
npm run lint
npm run build
```

如果 PowerShell 内部 `npm` 子进程出现系统命令解析问题，可先设置：
```powershell
$env:ComSpec='C:\Windows\System32\cmd.exe'
$env:SystemRoot='C:\Windows'
$env:windir='C:\Windows'
```

## 协作规则补充
- 较大改动前先做 Git 备份提交
- 改动后至少运行一次 `lint` 或 `build`
- 验证通过后再更新 `workspace-meta/plans.md`
- 每次完成代码改动后做一次自审，优先检查布局、导入路径、响应式和构建稳定性
