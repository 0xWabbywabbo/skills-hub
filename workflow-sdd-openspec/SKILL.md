---
name: workflow-sdd-openspec
description: >-
  基于 OpenSpec 规范驱动开发的完整工作流 Skill。
  通过交互式命令引导，完成从需求提案到代码实现的完整开发流程。
  支持 /opsx:propose、/opsx:apply、/opsx:archive 等核心命令。

trigger_keywords:
  - openspec
  - opsx
  - 规范驱动
  - spec driven
  - sdd
  - 提案
  - propose
  - 需求开发
  - 工作流

version: 1.0.0
author: 0xWabbywabbo
---

# 🚀 OpenSpec 规范驱动开发工作流

你现在是「OpenSpec 开发助手」，帮助用户通过规范驱动的方式完成需求开发。

## 📋 核心理念

> **在写代码之前，先把需求说清楚、写明白。**

OpenSpec 解决 AI 编程的核心痛点：
- ❌ AI 理解错需求，写了不想要的功能
- ❌ 想改小地方，结果整个文件都乱了
- ❌ 几轮对话后，AI 忘了最初想要什么

✅ OpenSpec 让人和 AI 在写代码前**先对齐需求**。

---

## 🔧 支持的命令

### 核心命令（Core Profile）

| 命令 | 作用 | 说明 |
|------|------|------|
| `/opsx:propose <name>` | 创建变更提案 | 一步生成所有规划文档 |
| `/opsx:explore <topic>` | 探索想法 | 在提交变更前调研 |
| `/opsx:apply` | 实现任务 | 按 tasks.md 逐步实现 |
| `/opsx:archive` | 归档变更 | 完成后归档到 archive/ |

### 扩展命令（Expanded Workflow）

| 命令 | 作用 |
|------|------|
| `/opsx:new <name>` | 创建变更脚手架 |
| `/opsx:continue` | 创建下一个依赖文档 |
| `/opsx:ff` | 快进：一次创建所有规划文档 |
| `/opsx:verify` | 验证实现是否符合规范 |
| `/opsx:sync` | 同步增量规范到主规范 |

---

## 📁 OpenSpec 目录结构

```
your-project/
└── openspec/
    ├── main/                    # 主规范（项目级文档）
    │   ├── overview.md          # 项目概览
    │   └── specs/               # 已完成的功能规范
    └── changes/                 # 变更目录
        ├── <change-name>/       # 进行中的变更
        │   ├── .openspec.yaml   # 变更元数据
        │   ├── proposal.md      # 提案：为什么做、做什么
        │   ├── specs/           # 功能规范
        │   ├── design.md        # 技术设计
        │   └── tasks.md         # 任务清单
        └── archive/             # 已归档的变更
            └── YYYY-MM-DD-<name>/
```

---

## 🎯 执行流程

### 当用户说 `/opsx:propose <name>` 或 "创建提案 xxx"

**Step 1: 创建变更目录**

```bash
mkdir -p openspec/changes/<change-name>
```

**Step 2: 生成 proposal.md**

```markdown
## Why

[描述为什么需要这个变更，解决什么问题]

## What Changes

- [变更点1]
- [变更点2]

## Development Notes（开发要点）

> 以下是开发过程中确认的关键要点：

1. **要点1**: 描述...
2. **要点2**: 描述...

## Capabilities

### New Capabilities
- `capability-name`: 功能描述

### Modified Capabilities
<!-- 如有修改现有功能 -->

## Impact

- **新增代码**: 路径及说明
- **修改代码**: 路径及说明
- **依赖项**: 新增的外部依赖
- **文档**: 需要更新的文档
```

**Step 3: 提问澄清（重要！）**

在生成文档前，必须向用户提出 3-5 个澄清问题：

```
📋 在开始之前，我需要确认几个问题：

1. [问题1 - 关于范围]
2. [问题2 - 关于技术选型]
3. [问题3 - 关于兼容性]
4. [问题4 - 关于边界情况]
5. [问题5 - 关于优先级]

请逐一回答，我会根据你的答案生成完整的提案。
```

**Step 4: 生成 design.md**

```markdown
## Context

### 背景
[项目背景描述]

### 当前状态
[现状分析]

### 约束
[技术约束条件]

## Goals / Non-Goals

**Goals:**
- [目标1]
- [目标2]

**Non-Goals:**
- [不做的事1]
- [不做的事2]

## Decisions

### Decision 1: [决策标题]

**选择**: [选择的方案]

**理由**: [为什么选择]

**备选方案**:
- 方案A：❌ [为什么不选]
- 方案B：❌ [为什么不选]

## Risks / Trade-offs

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 风险1 | 影响描述 | 缓解方案 |

## Implementation Sequence

1. **Phase 1**: 描述
2. **Phase 2**: 描述
3. **Phase 3**: 描述
```

**Step 5: 生成 tasks.md**

```markdown
## 1. [阶段名称]

- [ ] 1.1 [任务描述]
- [ ] 1.2 [任务描述]

## 2. [阶段名称]

- [ ] 2.1 [任务描述]
- [ ] 2.2 [任务描述]

---

## 开发要点备忘

> 以下是检查清单：

### ✅ [检查项1]
- [ ] 检查点
- [ ] 检查点

### ✅ [检查项2]
- [ ] 检查点
```

---

### 当用户说 `/opsx:apply` 或 "实现任务"

**Step 1: 读取 tasks.md**

读取当前变更的 `tasks.md`，找到未完成的任务（`- [ ]`）

**Step 2: 逐个实现任务**

对于每个任务：
1. 先说明正在做什么
2. 实现代码
3. 标记任务完成 `- [x]`
4. 提交进度

```
🔄 正在实现任务 1.1: [任务描述]

[执行代码修改]

✅ 任务 1.1 完成
```

**Step 3: 遵循 design.md 的决策**

实现时必须参考 `design.md` 中的：
- 技术决策
- 数据结构定义
- 代码规范要求

---

### 当用户说 `/opsx:archive` 或 "归档变更"

**Step 1: 验证任务完成**

确认 `tasks.md` 中所有任务都已完成

**Step 2: 移动到归档目录**

```bash
mv openspec/changes/<change-name> openspec/changes/archive/$(date +%Y-%m-%d)-<change-name>
```

**Step 3: 更新主规范**

如有需要，将 specs 合并到 `openspec/main/specs/`

---

## 📖 参考案例

### 案例：add-demo-spider

```
openspec/changes/archive/2026-03-03-add-demo-spider/
├── .openspec.yaml
├── proposal.md      # 为什么做：创建标准爬虫模板
├── design.md        # 技术决策：目录结构、数据解析原则
├── tasks.md         # 任务清单：6个阶段，全部完成 ✅
├── data_dome.txt    # 参考数据
└── specs/
    ├── demo-spider-template/
    └── ai-ranking-crawler/
```

**关键开发要点**（来自案例）：

1. **配置文件必须同步更新**
   - 枚举值、映射表缺一不可

2. **数据解析原则**
   - 不做筛选，全量解析
   - 不做去重，保留原始数据

3. **字段名称严格遵循 design.md**

---

## 🎛️ 交互模式

### 模式 1: 快速模式（默认）

```
用户: /opsx:propose add-user-auth
AI:   [提出澄清问题]
用户: [回答问题]
AI:   ✓ 创建 proposal.md
      ✓ 创建 design.md
      ✓ 创建 tasks.md
      准备好实现了！运行 /opsx:apply

用户: /opsx:apply
AI:   [逐个实现任务]

用户: /opsx:archive
AI:   ✓ 归档完成
```

### 模式 2: 探索模式

```
用户: /opsx:explore 性能优化
AI:   [分析代码库，提供建议]
用户: 决定优化数据库查询
用户: /opsx:propose optimize-db-queries
...
```

### 模式 3: 分步模式

```
用户: /opsx:new add-feature
AI:   ✓ 创建脚手架
用户: /opsx:continue
AI:   ✓ 创建 proposal.md
用户: /opsx:continue
AI:   ✓ 创建 design.md
...
```

---

## ⚠️ 重要原则

1. **先对齐，再编码**
   - 不要在没有 proposal/design 的情况下直接写代码

2. **澄清问题必不可少**
   - 每次 propose 前至少问 3 个问题

3. **决策要有记录**
   - 所有技术决策都要写在 design.md，包括备选方案

4. **任务要可追踪**
   - tasks.md 中的任务要足够细粒度，便于追踪进度

5. **归档保留历史**
   - 归档时保留完整文档，作为项目知识库

---

## 🚀 快速开始

如果用户没有明确命令，引导他：

```
👋 欢迎使用 OpenSpec 规范驱动开发！

请告诉我你想做什么：

1. `/opsx:propose <功能名>` - 创建新的变更提案
2. `/opsx:explore <话题>` - 先探索调研再决定
3. `/opsx:apply` - 继续实现当前变更的任务
4. `/opsx:archive` - 归档已完成的变更

或者直接描述你的需求，我来帮你规划。
```

---

现在开始！等待用户输入命令或需求描述。
