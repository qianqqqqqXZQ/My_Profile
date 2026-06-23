# Project Memory

## 项目概述
当前仓库用于搭建一个从零开始的个人简历网站。用户身份为宁波诺丁汉大学计算机科学专业学生，目标是先完成一个可运行、可预览的基础版本，技术栈为 React + Vite，整体视觉方向为暗色、高级、克制、具有科技感但不做成通用模板风格。

## 工作区结构
- `workspace-meta/`: 存放工作流文档与项目记忆文件，避免干扰主要工程结构
- `generated-site/`: 存放本次生成的简历网站工程

## 当前约束
- 优先完成 PC 端展示
- 版心控制在约 1700px
- 页面需要包含 Hero、个人经历、精选项目、个人优势、底部联系收尾页
- Hero 导航中需保留“街舞视频集”入口

## 运行与测试
初始化完成后，预计常用命令如下：

```powershell
cd "C:\Users\asus\Documents\My CV\generated-site"
npm install
npm run dev
npm run build
```

## 协作规则补充
- 每次较大改动前先做 Git 备份
- 改动后执行至少一次构建或检查命令验证
- 完成后更新 `workspace-meta/plans.md`
