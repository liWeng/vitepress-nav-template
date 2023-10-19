#### 示例源码
***

``` html
<su-button s-type="default">Default</su-button>
<su-button s-type="primary">Primary</su-button>
<su-button s-type="success">Success</su-button>
<su-button s-type="info">Info</su-button>
<su-button s-type="warning">Warning</su-button>
<su-button s-type="danger">Danger</su-button>
<su-button s-type="inverse">Inverse</su-button>
<su-button s-type="purple">Purple</su-button>
<su-button s-type="success" labeled="true" label-ico="check">Success</su-button>
<su-button s-type="primary" labeled="true" label-right="true" label-ico="times">Success</su-button>
<su-button s-type="default" size="large">Large</su-button>
<su-button s-type="default" size="small">small</su-button>
<su-button s-type="default" size="ex-small">ex-small</su-button>
<su-button s-type="default" border-type="pill-left">Pill left</su-button>
<su-button s-type="default" border-type="pill-right">Pill right</su-button>
<su-button s-type="default" border-type="oval">oval</su-button>
<su-button s-type="default" border-type="square">Square</su-button>
<su-button s-type="default" disabled="true">disabled</su-button>
```
#### 属性
****
|属性名|类别|参数|默认值|描述|
|------|----|----|------|----|
|s-type|String| -| button| `"default"` `"primary"`|
|labeled|Boolean|-| false|按钮图标，默认图标在左边|
|label-ico|String|- | _ | 图标名称，支持icons库里的所有名称，如 `"check" "times"`|
|size|String|-|-|支持大、小、超级小 `"large" "small" "ex-small"`|
|border-type|String|-|-|按钮边框形状|
|disabled|Boolean|-|false|按钮是否可用|
