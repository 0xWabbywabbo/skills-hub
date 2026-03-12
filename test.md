
workflow-sdd-openspec开发流程
记录：一次在openclaw中实现openspec的开发流程

前提条件
1.有一只龙虾（openspec）
2.skill：workflow-sdd-openspec（https://skills.netease.com/skills/skill_a3a2346a212e）

收益：传统开发一般无法脱离电脑，电脑还是主要的载体。随着openclaw的爆发以及 sdd规范化式发展，把聊天式开发变为了可能，打出一记组合技。

整个流程其实和正常的openspec的开发方式无异，只不过是通过聊天的方式完成开发，中间无任何敲代码的环节，相较以前在ide中开发，那是相当的丝滑了。个人感觉openclaw和sdd的结合是相当恰当的，sdd的规范化减少了智能体自由发挥的空间，进而减少了和openclaw交互的成本，这时的聊天工具的优势就发挥出来了，每个步骤都是确定性的，无需频繁查阅交互（类似vibe形式）。

workflow工作流程
1.AI 接受指令，和用户确认项目目录，指令我做了汉化，原厂指令也支持，只不过用手机发送指令（/opsx:new）略微麻烦。

<img width="496" height="410" alt="1" src="https://github.com/user-attachments/assets/b99fb31b-72f0-40aa-b0a0-04324cfce0de" />


2.发送项目目录，自动检测项目中是否包含openspec，没有初始化会询问用户是否初始化

<img width="668" height="513" alt="2" src="https://github.com/user-attachments/assets/be295a2d-9e3b-416f-9083-b01cd1780dcd" />


3.确认提案名称

<img width="671" height="470" alt="3" src="https://github.com/user-attachments/assets/9272c9b6-9fdf-4a3e-8437-02c90326af96" />

4.提案交互，使用openspec工具的大佬，肯定是比较熟悉的。

<img width="485" height="637" alt="4" src="https://github.com/user-attachments/assets/153bdc74-22f5-4deb-94ed-9c023fc30a1e" />

5.回复他的问题

<img width="503" height="144" alt="5" src="https://github.com/user-attachments/assets/3e0725b2-7889-4804-9104-377acf767658" />

6.生成proposal.md文件

<img width="381" height="689" alt="6" src="https://github.com/user-attachments/assets/6b1e9e8f-6cce-4624-995b-251eff040bc7" />

7.这里Ai理解有些偏差，可能因为openclaw和开发的CM，目前不是一个模型，没有上下文的知识，此处引导了一下，引导过后的proposal.md非常的贴近需求。感觉可以流程上加上一个步骤，比如参考xx代码，去设计，参考xx change 去设计。

<img width="1043" height="686" alt="7" src="https://github.com/user-attachments/assets/25080f80-7706-407c-9110-520cea315ac1" />

8.确认，生成design.md,这里不贴design的详情了，里面的内容和正常去做design没有任何区别。

<img width="662" height="508" alt="8" src="https://github.com/user-attachments/assets/57b27fa2-94d0-42d6-b51c-d14654e48c42" />

9.这里给design 补充了一些信息素，以便更好的进行设计。这里缺少了一个关键的信息没有给到智能体，所以也导致后面验证时，发现问题，其实是可以在这个环节补充这个信息，就无需后续在修复。

<img width="1037" height="443" alt="9" src="https://github.com/user-attachments/assets/88b57b98-8e3c-484f-8472-79cfb7579e58" />

<img width="684" height="327" alt="10" src="https://github.com/user-attachments/assets/20eeade5-4265-4215-8403-78855b904fd5" />

<img width="662" height="129" alt="11" src="https://github.com/user-attachments/assets/e5fe6207-cda4-4a5e-8a09-a75e5d97f50c" />

<img width="681" height="397" alt="12" src="https://github.com/user-attachments/assets/64439fb6-d02d-4a7c-bcc9-76df32590a60" />

10.确认design，生成tasks。

<img width="743" height="503" alt="13" src="https://github.com/user-attachments/assets/aecc4bbd-29cb-448a-9499-4457407ce27c" />

11.保存文件

<img width="651" height="539" alt="14" src="https://github.com/user-attachments/assets/1e5d7451-fcb5-40f8-8bb9-d8f555701d75" />

12.执行指令

<img width="669" height="431" alt="15" src="https://github.com/user-attachments/assets/7ff3fcec-5294-4e19-a029-16858c047a6a" />

13.执行过程，中间有过询问，直接让他全部执行完。

<img width="690" height="252" alt="16" src="https://github.com/user-attachments/assets/aa47d9a8-99e6-466b-b9f0-922333ec9c7e" />

<img width="620" height="299" alt="17" src="https://github.com/user-attachments/assets/a3e1203b-f2c8-449d-88ef-19a33d80ae79" />


14.执行验证

<img width="689" height="421" alt="18" src="https://github.com/user-attachments/assets/4e4a21cd-9e59-410c-a1b4-bb3b60a950f4" />

15.开发完成

<img width="647" height="269" alt="19" src="https://github.com/user-attachments/assets/02a37d7a-de34-41e3-8a36-751d5b3c8e9e" />

16.归档

<img width="667" height="495" alt="20" src="https://github.com/user-attachments/assets/ace55df1-8e33-4620-845b-d98419df8602" />

17.代码提交

<img width="662" height="474" alt="21" src="https://github.com/user-attachments/assets/3692d82d-c63b-4dbf-ae4d-82aa62b89d3a" />

18.确认代码提交，此处由于design过程提供的信息不足，导致了一个fix，还有一个正常调整的fix，其他无调整。

<img width="1184" height="254" alt="22" src="https://github.com/user-attachments/assets/f81c3147-2806-4149-9272-1ef81ca65141" />

19.确认程序数据输出没问题。

<img width="897" height="279" alt="23" src="https://github.com/user-attachments/assets/48dc313c-b848-4f56-8b6c-f75c89b35bde" />





