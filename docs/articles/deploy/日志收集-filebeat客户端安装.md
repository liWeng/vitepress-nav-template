### filebeat安装

### Filebeat简介
Filebeat由两个主要组成部分组成：prospector(探勘者)和 harvesters(矿车)。这些组件一起工作来读取文件并将事件数据发送到指定的output。
prospector: 负责找到所有需要进行读取的数据源
harvesters：负责读取单个文件的内容，并将内容发送到output中，负责文件的打开和关闭。
### Filebeat工作原理
Filebeat可以保持每个文件的状态，并且频繁地把文件状态从注册表里更新到磁盘。这里所说的文件状态是用来记录上一次Harvster读取文件时读取到的位置，以保证能把全部的日志数据都读取出来，然后发送给output。如果在某一时刻，作为output的ElasticSearch或者Logstash变成了不可用，Filebeat将会把最后的文件读取位置保存下来，直到output重新可用的时候，快速地恢复文件数据的读取。在Filebaet运行过程中，每个Prospector的状态信息都会保存在内存里。如果Filebeat出行了重启，完成重启之后，会从注册表文件里恢复重启之前的状态信息，让FIlebeat继续从之前已知的位置开始进行数据读取。
### Filebeat用途
为什么要用filebeat来收集日志？为什么不直接用logstash收集日志？
因为logstash是jvm跑的，资源消耗比较大，启动一个logstash就需要消耗500M左右的内存（这就是为什么logstash启动特别慢的原因），而filebeat只需要10来M内存资源。常用的ELK日志采集方案中，大部分的做法就是将所有节点的日志内容通过filebeat发送到logstash，logstash根据配置文件进行过滤。然后将过滤之后的文件输送到elasticsearch中，通过kibana去展示。

适用于集群环境下，服务多，且部署在不同机器




### 上传filebeat文件
上传rpm文件到服务器


### 安装filebeat

```
rpm -ivh filebeat-6.1.1-x86_64.rpm
```


### 修改配置内容

修改output.elasticsearch下hosts中IP，端口配置

```
vi /etc/filebeat/filebeat.yml
```

```
###################### Filebeat Configuration Example #########################

# This file is an example configuration file highlighting only the most common
# options. The filebeat.reference.yml file from the same directory contains all the
# supported options with more comments. You can use it as a reference.
#
# You can find the full configuration reference here:
# https://www.elastic.co/guide/en/beats/filebeat/index.html

# For more available modules and options, please see the filebeat.reference.yml sample
# configuration file.

#=========================== Filebeat prospectors =============================

filebeat.prospectors:

# Each - is a prospector. Most options can be set at the prospector level, so
# you can use different prospectors for various configurations.
# Below are the prospector specific configurations.

- type: log

  # Change to true to enable this prospector configuration.
  enabled: true

  # Paths that should be crawled and fetched. Glob based paths.
  paths:
    - /data/docker/containers/*/*.log
    #- c:\programdata\elasticsearch\logs\*

  json.keys_under_root: true
  json.message_key: log
  tail_files: true
  multiline.pattern: '^([0-9]{2}:|[0-9]{2}-)'
  multiline.negate: true
  multiline.match: after
  multiline.timeout: 3s
 



#============================= Filebeat modules ===============================

filebeat.config.modules:
  # Glob pattern for configuration loading
  path: ${path.config}/modules.d/*.yml

  # Set to true to enable config reloading
  reload.enabled: false

  # Period on which files under path should be checked for changes
  #reload.period: 10s

#-------------------------- Elasticsearch output ------------------------------
output.elasticsearch:
  hosts: ["10.11.201.10:9222"]

setup.template.name: "filebeat.template.json"
setup.template.fields: "filebeat.template.json"
setup.template.overwrite: true
setup.template.enabled: false

processors:
- drop_fields:
    fields: ["input_type", "offset", "stream", "beat"]

#============================== Kibana =====================================

# Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.
# This requires a Kibana endpoint configuration.
setup.kibana:

#================================ Logging =====================================

# Sets log level. The default log level is info.
# Available log levels are: critical, error, warning, info, debug
#logging.level: debug

# At debug level, you can selectively enable logging only for some components.
# To enable all selectors use ["*"]. Examples of other selectors are "beat",
# "publish", "service".
#logging.selectors: ["*"]
```

### 编写创建模板配置文件

```
vi /etc/filebeat/filebeat.template.json
```

```
{
  "mappings": {
    "_default_": {
      "_all": {
        "norms": false
      },
      "_meta": {
        "version": "5.1.2"
      },
      "dynamic_templates": [
        {
          "strings_as_keyword": {
            "mapping": {
              "ignore_above": 1024,
              "type": "keyword"
            },
            "match_mapping_type": "string"
          }
        }
      ],
      "properties": {
        "@timestamp": {
          "type": "date"
        },
        "beat": {
          "properties": {
            "hostname": {
              "ignore_above": 1024,
              "type": "keyword"
            },
            "name": {
              "ignore_above": 1024,
              "type": "keyword"
            },
            "version": {
              "ignore_above": 1024,
              "type": "keyword"
            }
          }
        },
        "input_type": {
          "ignore_above": 1024,
          "type": "keyword"
        },
        "message": {
          "norms": false,
          "type": "text"
        },
        "meta": {
          "properties": {
            "cloud": {
              "properties": {
                "availability_zone": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "instance_id": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "machine_type": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "project_id": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "provider": {
                  "ignore_above": 1024,
                  "type": "keyword"
                },
                "region": {
                  "ignore_above": 1024,
                  "type": "keyword"
                }
              }
            }
          }
        },
        "offset": {
          "type": "long"
        },
        "source": {
          "ignore_above": 1024,
          "type": "keyword"
        },
        "tags": {
          "ignore_above": 1024,
          "type": "keyword"
        },
        "type": {
          "ignore_above": 1024,
          "type": "keyword"
        }
      }
    }
  },
  "order": 0,
  "settings": {
    "index.refresh_interval": "5s"
  },
  "template": "filebeat-*"
}

```
### 重启filebeat

```
systemctl restart filebeat
```

