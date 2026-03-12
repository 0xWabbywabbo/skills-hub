# 🧠 Skills Hub

A collection of AI agent skills for enhancing your development workflow.

## 📦 Available Skills

| Skill | Description | Version |
|-------|-------------|---------|
| [skills-search](./skills-search/) | Search and install skills from multiple repositories | v1.2.0 |
| [workflow-sdd-openspec](./workflow-sdd-openspec/) | OpenSpec 规范驱动开发工作流 | v1.0.0 |

## 🚀 Quick Start

### Using with Claude Code / Cursor / AI Agents

1. Clone this repository:
```bash
git clone https://github.com/0xWabbywabbo/skills-hub.git
```

2. Navigate to the skill you want to use
3. Follow the instructions in the skill's `SKILL.md` file

### Installing a Skill

```bash
npx skills install <skill-name>
```

## 📋 Skills Overview

### skills-search

Search skills across multiple repositories:
- **skills.sh** - Official skill repository
- **skills.homes** - Community skills
- **skillsmp.com** - Skill marketplace

**Features:**
- 🔍 Search across 3 major skill repositories
- 📊 Results sorted by installs/stars
- 📦 Easy installation with `npx skills install`
- 🛡️ Built-in environment detection for dependencies

## 🛠️ Adding New Skills

Each skill should contain:
```
skill-name/
├── SKILL.md          # Main skill definition (required)
├── scripts/          # Supporting scripts (optional)
└── references/       # Reference materials (optional)
```

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new skills
- Improve existing skills
- Report issues
- Submit pull requests

---

Made with ❤️ by [0xWabbywabbo](https://github.com/0xWabbywabbo)
