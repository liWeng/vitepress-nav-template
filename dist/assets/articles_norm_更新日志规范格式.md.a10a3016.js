import{_ as s,o as n,c as a,a as l}from"./app.4690b2e6.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":3,"title":"changelog 文件","slug":"changelog-文件","link":"#changelog-文件","children":[]},{"level":3,"title":"基本的 changelog 格式","slug":"基本的-changelog-格式","link":"#基本的-changelog-格式","children":[]},{"level":3,"title":"词汇表","slug":"词汇表","link":"#词汇表","children":[]},{"level":3,"title":"样本示例","slug":"样本示例","link":"#样本示例","children":[]}],"relativePath":"articles/norm/更新日志规范格式.md","lastUpdated":1697707960000}'),e={name:"articles/norm/更新日志规范格式.md"},p=l(`<h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-hidden="true">#</a></h3><p>作为一个普通的开发者，必须为项目维护一个更新日志（以下简称 changelog）</p><ol><li>如果你在维护一个开源项目，或者公司内部的底层技术产品，那么提供一个 changelog 是必需的。开发者用户很可能需要从一个低版本升级到最新版，changelog 可以帮助他们了解新版本有哪些变化。</li><li>如果你在开发一个业务应用，那么 changelog 不是必需的。然而提供一个 changelog 会更好，因为其他协作者或是交接方能更直观地看到业务逻辑的演变。</li></ol><p>我记得你还约束了 Git log 的规范，那为何还要再规范 changelog 的格式呢？两者不是差不多？</p><ol><li>即便是约束了 Git log 的规范，也无法直接将 Git log 导出一个良好的 changelog。因为 changelog 中描述的内容需要更加精炼和归纳，对信息降噪处理等等，因此手写 changelog 仍然是更好的选择；当然，不排除以后自动转换的可能。</li><li>不管是手写还是自动转换，changelog 的格式都不能直接照搬 Git log 的格式。</li></ol><h3 id="changelog-文件" tabindex="-1">changelog 文件 <a class="header-anchor" href="#changelog-文件" aria-hidden="true">#</a></h3><p>changelog 文件必须取名为 <a href="http://CHANGELOG.md" target="_blank" rel="noreferrer">CHANGELOG.md</a>，存放在项目的根目录下，和 README.md等并列，同时保持风格一致。<br> 这种命名方式已然是国际通则，以下再阐释一番：</p><ol><li>使用大写来表明本文件的重要性，相当于是项目仓库元信息的一部分。</li><li>使用 .md 作为后缀，而不是 .txt 或干脆不加后缀。使用标准 Markdown 语法，从而可以方便地渲染。</li></ol><h3 id="基本的-changelog-格式" tabindex="-1">基本的 changelog 格式 <a class="header-anchor" href="#基本的-changelog-格式" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"># 更新日志</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## [&lt;version&gt;] - &lt;date&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### &lt;type&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* &lt;desc&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">* &lt;desc&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### &lt;type&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* &lt;desc&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">* &lt;desc&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[&lt;version&gt;]: &lt;version-diff-url&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>其中，按照最新的版本号在前的顺序排列。</p><h3 id="词汇表" tabindex="-1">词汇表 <a class="header-anchor" href="#词汇表" aria-hidden="true">#</a></h3><h4 id="标题" tabindex="-1">标题 <a class="header-anchor" href="#标题" aria-hidden="true">#</a></h4><p>标题部分使用固定的文案：「更新日志」。<br> 如果是面向国际的项目，需要使用英文，则文案为「Change Log」。</p><h4 id="version" tabindex="-1">version <a class="header-anchor" href="#version" aria-hidden="true">#</a></h4><p>版本号 version 即项目的每一个发布版所使用的版本号。版本号需遵循 SemVer 版本号命名规范。<br> 注意：版本号前不要加 v。<br> 另外，版本号建议增加一个链接，指向当前版本和上一个版本之间的 diff。详情可参考后文的样本示例。</p><h4 id="date" tabindex="-1">date <a class="header-anchor" href="#date" aria-hidden="true">#</a></h4><p>发布时间 date 即版本发布时的所在日期。<br> 日期采用 yyyy-MM-dd 的格式。<br> 示例：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// good</span></span>
<span class="line"><span style="color:#A6ACCD;">2016-01-01</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// bad</span></span>
<span class="line"><span style="color:#A6ACCD;">2016-1-1</span></span>
<span class="line"><span style="color:#A6ACCD;">20160101</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="type" tabindex="-1">type <a class="header-anchor" href="#type" aria-hidden="true">#</a></h4><p>更新类型 type 用以说明更新的方面。这里的 type 和 Git 提交日志中的 type 有所联系，然而并不一一对应。<br> 同前面提到的「标题」部分，默认使用中文版本的词汇，如果是面向国际的项目，则使用括号中的英文版本。<br> type 的可选值如下：</p><ul><li>新增（Features）：新增功能。</li><li>修复（Fixed）：修复 bug。</li><li>变更（Changed）：对于某些已存在功能所发生的逻辑变化。</li><li>优化（Refactored）：性能或结构上的优化，并未带来功能的逻辑变化。</li><li>即将删除（Deprecated）：不建议使用 / 在以后的版本中即将删除的功能。</li><li>删除（Removed）：已删除的功能。</li></ul><h4 id="desc" tabindex="-1">desc <a class="header-anchor" href="#desc" aria-hidden="true">#</a></h4><p>描述内容 desc 需要注意：</p><ol><li>使用完整的句子。即在标点方面遵循一般的文档格式规范；如果使用英语，则句首大写。</li><li>时态方面使用一般现在时，不要用过去时态。虽然查看 changelog 时，changelog 内容本身都发生在过去，然而使用现在时的时态更简洁明确，并且更易达成一致性。</li><li>句式使用祈使句式。即一般情况不要增加主语。因为在绝大情况下，主语都是作者「我」。</li><li>注明修复的问题。如有提过 issue，则在句尾增加 issue 的 ID 和链接。</li></ol><h3 id="样本示例" tabindex="-1">样本示例 <a class="header-anchor" href="#样本示例" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"># 更新日志</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## [6.2.4] - 2015-12-16</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 变更</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* \`Node.fn.map()\` 之前返回 NodeList 自身，现在将正确地返回被 map 后的数组。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 修复</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* 修复在非 ks-debug 模式下仍然输出 \`KISSY.log()\` 控制台信息的问题。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## [6.2.3] - 2015-11-16</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 修复</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* 修复 \`KISSY.getScript\` 在传入了 \`timeout\` 参数后报错的问题。[#12]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## [6.2.2] - 2015-11-04</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 新增</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* node 模块增加 API \`Node.fn\`，以兼容传统 KIMI 的 node 对象扩展机制。</span></span>
<span class="line"><span style="color:#A6ACCD;">* ua 模块现在可以识别 Microsoft Edge 浏览器。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 优化</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* \`KISSY.getScript()\` 从 loader 模块中独立出来，io 模块不再依赖 loader 模块。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 已删除</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* io 模块默认去掉了对 XML 的 converter 支持。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div>`,27),r=[p];function i(c,o,t,b,d,C){return n(),a("div",null,r)}const u=s(e,[["render",i]]);export{h as __pageData,u as default};
