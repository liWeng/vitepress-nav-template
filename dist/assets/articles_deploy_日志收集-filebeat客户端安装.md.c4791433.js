import{_ as s,o as n,c as a,a as l}from"./app.e6daa892.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"filebeat安装","slug":"filebeat安装","link":"#filebeat安装","children":[]},{"level":3,"title":"Filebeat简介","slug":"filebeat简介","link":"#filebeat简介","children":[]},{"level":3,"title":"Filebeat工作原理","slug":"filebeat工作原理","link":"#filebeat工作原理","children":[]},{"level":3,"title":"Filebeat用途","slug":"filebeat用途","link":"#filebeat用途","children":[]},{"level":3,"title":"上传filebeat文件","slug":"上传filebeat文件","link":"#上传filebeat文件","children":[]},{"level":3,"title":"安装filebeat","slug":"安装filebeat","link":"#安装filebeat","children":[]},{"level":3,"title":"修改配置内容","slug":"修改配置内容","link":"#修改配置内容","children":[]},{"level":3,"title":"编写创建模板配置文件","slug":"编写创建模板配置文件","link":"#编写创建模板配置文件","children":[]},{"level":3,"title":"重启filebeat","slug":"重启filebeat","link":"#重启filebeat","children":[]}],"relativePath":"articles/deploy/日志收集-filebeat客户端安装.md","lastUpdated":1697779797000}'),e={name:"articles/deploy/日志收集-filebeat客户端安装.md"},p=l(`<h3 id="filebeat安装" tabindex="-1">filebeat安装 <a class="header-anchor" href="#filebeat安装" aria-hidden="true">#</a></h3><h3 id="filebeat简介" tabindex="-1">Filebeat简介 <a class="header-anchor" href="#filebeat简介" aria-hidden="true">#</a></h3><p>Filebeat由两个主要组成部分组成：prospector(探勘者)和 harvesters(矿车)。这些组件一起工作来读取文件并将事件数据发送到指定的output。 prospector: 负责找到所有需要进行读取的数据源 harvesters：负责读取单个文件的内容，并将内容发送到output中，负责文件的打开和关闭。</p><h3 id="filebeat工作原理" tabindex="-1">Filebeat工作原理 <a class="header-anchor" href="#filebeat工作原理" aria-hidden="true">#</a></h3><p>Filebeat可以保持每个文件的状态，并且频繁地把文件状态从注册表里更新到磁盘。这里所说的文件状态是用来记录上一次Harvster读取文件时读取到的位置，以保证能把全部的日志数据都读取出来，然后发送给output。如果在某一时刻，作为output的ElasticSearch或者Logstash变成了不可用，Filebeat将会把最后的文件读取位置保存下来，直到output重新可用的时候，快速地恢复文件数据的读取。在Filebaet运行过程中，每个Prospector的状态信息都会保存在内存里。如果Filebeat出行了重启，完成重启之后，会从注册表文件里恢复重启之前的状态信息，让FIlebeat继续从之前已知的位置开始进行数据读取。</p><h3 id="filebeat用途" tabindex="-1">Filebeat用途 <a class="header-anchor" href="#filebeat用途" aria-hidden="true">#</a></h3><p>为什么要用filebeat来收集日志？为什么不直接用logstash收集日志？ 因为logstash是jvm跑的，资源消耗比较大，启动一个logstash就需要消耗500M左右的内存（这就是为什么logstash启动特别慢的原因），而filebeat只需要10来M内存资源。常用的ELK日志采集方案中，大部分的做法就是将所有节点的日志内容通过filebeat发送到logstash，logstash根据配置文件进行过滤。然后将过滤之后的文件输送到elasticsearch中，通过kibana去展示。</p><p>适用于集群环境下，服务多，且部署在不同机器</p><h3 id="上传filebeat文件" tabindex="-1">上传filebeat文件 <a class="header-anchor" href="#上传filebeat文件" aria-hidden="true">#</a></h3><p>上传rpm文件到服务器</p><h3 id="安装filebeat" tabindex="-1">安装filebeat <a class="header-anchor" href="#安装filebeat" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">rpm -ivh filebeat-6.1.1-x86_64.rpm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="修改配置内容" tabindex="-1">修改配置内容 <a class="header-anchor" href="#修改配置内容" aria-hidden="true">#</a></h3><p>修改output.elasticsearch下hosts中IP，端口配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/filebeat/filebeat.yml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">###################### Filebeat Configuration Example #########################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># This file is an example configuration file highlighting only the most common</span></span>
<span class="line"><span style="color:#A6ACCD;"># options. The filebeat.reference.yml file from the same directory contains all the</span></span>
<span class="line"><span style="color:#A6ACCD;"># supported options with more comments. You can use it as a reference.</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># You can find the full configuration reference here:</span></span>
<span class="line"><span style="color:#A6ACCD;"># https://www.elastic.co/guide/en/beats/filebeat/index.html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># For more available modules and options, please see the filebeat.reference.yml sample</span></span>
<span class="line"><span style="color:#A6ACCD;"># configuration file.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#=========================== Filebeat prospectors =============================</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">filebeat.prospectors:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Each - is a prospector. Most options can be set at the prospector level, so</span></span>
<span class="line"><span style="color:#A6ACCD;"># you can use different prospectors for various configurations.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Below are the prospector specific configurations.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- type: log</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  # Change to true to enable this prospector configuration.</span></span>
<span class="line"><span style="color:#A6ACCD;">  enabled: true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  # Paths that should be crawled and fetched. Glob based paths.</span></span>
<span class="line"><span style="color:#A6ACCD;">  paths:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - /data/docker/containers/*/*.log</span></span>
<span class="line"><span style="color:#A6ACCD;">    #- c:\\programdata\\elasticsearch\\logs\\*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  json.keys_under_root: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  json.message_key: log</span></span>
<span class="line"><span style="color:#A6ACCD;">  tail_files: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  multiline.pattern: &#39;^([0-9]{2}:|[0-9]{2}-)&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  multiline.negate: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  multiline.match: after</span></span>
<span class="line"><span style="color:#A6ACCD;">  multiline.timeout: 3s</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#============================= Filebeat modules ===============================</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">filebeat.config.modules:</span></span>
<span class="line"><span style="color:#A6ACCD;">  # Glob pattern for configuration loading</span></span>
<span class="line"><span style="color:#A6ACCD;">  path: \${path.config}/modules.d/*.yml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  # Set to true to enable config reloading</span></span>
<span class="line"><span style="color:#A6ACCD;">  reload.enabled: false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  # Period on which files under path should be checked for changes</span></span>
<span class="line"><span style="color:#A6ACCD;">  #reload.period: 10s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#-------------------------- Elasticsearch output ------------------------------</span></span>
<span class="line"><span style="color:#A6ACCD;">output.elasticsearch:</span></span>
<span class="line"><span style="color:#A6ACCD;">  hosts: [&quot;10.11.201.10:9222&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">setup.template.name: &quot;filebeat.template.json&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">setup.template.fields: &quot;filebeat.template.json&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">setup.template.overwrite: true</span></span>
<span class="line"><span style="color:#A6ACCD;">setup.template.enabled: false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">processors:</span></span>
<span class="line"><span style="color:#A6ACCD;">- drop_fields:</span></span>
<span class="line"><span style="color:#A6ACCD;">    fields: [&quot;input_type&quot;, &quot;offset&quot;, &quot;stream&quot;, &quot;beat&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#============================== Kibana =====================================</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.</span></span>
<span class="line"><span style="color:#A6ACCD;"># This requires a Kibana endpoint configuration.</span></span>
<span class="line"><span style="color:#A6ACCD;">setup.kibana:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#================================ Logging =====================================</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Sets log level. The default log level is info.</span></span>
<span class="line"><span style="color:#A6ACCD;"># Available log levels are: critical, error, warning, info, debug</span></span>
<span class="line"><span style="color:#A6ACCD;">#logging.level: debug</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># At debug level, you can selectively enable logging only for some components.</span></span>
<span class="line"><span style="color:#A6ACCD;"># To enable all selectors use [&quot;*&quot;]. Examples of other selectors are &quot;beat&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"># &quot;publish&quot;, &quot;service&quot;.</span></span>
<span class="line"><span style="color:#A6ACCD;">#logging.selectors: [&quot;*&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><h3 id="编写创建模板配置文件" tabindex="-1">编写创建模板配置文件 <a class="header-anchor" href="#编写创建模板配置文件" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">vi /etc/filebeat/filebeat.template.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;mappings&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;_default_&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;_all&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;norms&quot;: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;_meta&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;version&quot;: &quot;5.1.2&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;dynamic_templates&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;strings_as_keyword&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;mapping&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;match_mapping_type&quot;: &quot;string&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      ],</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;@timestamp&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;date&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;beat&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;hostname&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;name&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;version&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;input_type&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;message&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;norms&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;meta&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;cloud&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;availability_zone&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;instance_id&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;machine_type&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;project_id&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;provider&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;region&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">                  &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">              }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;offset&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;long&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;source&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;tags&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;type&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;ignore_above&quot;: 1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &quot;type&quot;: &quot;keyword&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;order&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;settings&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;index.refresh_interval&quot;: &quot;5s&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;template&quot;: &quot;filebeat-*&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br></div></div><h3 id="重启filebeat" tabindex="-1">重启filebeat <a class="header-anchor" href="#重启filebeat" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">systemctl restart filebeat</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,21),o=[p];function r(t,i,c,b,u,C){return n(),a("div",null,o)}const y=s(e,[["render",r]]);export{m as __pageData,y as default};
