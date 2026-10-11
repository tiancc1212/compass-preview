# ep11 引擎v4输入适配

2026-10-11。本轮只兼容错误提示中的正常词间空格与旧连写输入；标准答案、accept、英文及中文题文、提示中文、台词与hints均未改。单词拼写错误规则（如biger）保持原样。

| 位置 | 旧规则 | 新规则 | 正常错答示例 |
|---|---|---|---|
| activities.q2.steps.0.wrong.1 | `^morebigger$` | `^more ?bigger$` | more bigger |
| activities.q2.steps.3.wrong.1 | `^morebeautiful$` | `^more ?beautiful$` | more beautiful |

输入规则由Willo上游引擎v4提供：多词答案要求保留词间空格，错误提示规则兼容空格不会放宽正确答案判定。rewrite输入关闭自动大写；题目标准答案/accept仍待Willo清单复核，本轮不代改。

以下为已完成的实际浏览器结果；静态正则检查不替代浏览器判定。

## 实际验证结果

- 当前内容版本：6（原5），共享引擎：v4。官方检查器：0错误、0提醒。
- 手机390×844真实输入和按钮点击：1道多词typed题、1个ans/accept候选均保留空格通过、去词间空格拒绝。
- 2条新错误规则逐条试了正常有空格和旧连写两种错答，均触发原中文专属提示并保持错误状态。
- 8个rewrite输入框实测autocapitalize/autocorrect/autocomplete均为off，spellcheck=false。
- 页面脚本错误0、资源404为0。测试目标均实际输入/点击；抵达目标前的无关题目使用内置快速通关，仅作导航。
- 动态数据逐字段比对：只发生上表wrong.re变更；题干、ans/accept、正确句及全部中英文提示未变。audio/lines.json、audio/hints.json哈希与改前一致。
- 本集证据：`../shots/v4_input_adaptation/changes.json`、`browser.json`；总截图和79项浏览器报告在`../../ep01/shots/v4_input_adaptation/`。

快速模式正确提交后会自动切到下一题，因此逐题通过依据是提交当刻的DOM锁定及正确状态；稳定代表截图另在总证据browser/representative_ep12_correct_stable.png与representative_ep08_wrong.png，关闭快速跳题后复核通过。
