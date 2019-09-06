# offlineonline-widget

Simple OfflineOnline widget built for version 4.x of the ArcGIS API for Javascript

![share-widget-offline](https://github.com/stokseth/offlineonline-widget/blob/master/images/offline.png?raw=true)​
![share-widget-online](https://github.com/stokseth/offlineonline-widget/blob/master/images/online.png?raw=true)​

## Features:

1.  No required properties. Independent on `MapView` and `SceneView`
2.  Check if user has network connetion
3.  Customizable how to check online
    - Polling URL (https://ipv4.icanhazip.com) - [default]
    - [Navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine)
4. Change style using CSS


## OfflineOnlineWidget

### Constructor:

#### new **OfflineOnlineWidget(_properties?_)**

##### Property Overview:

| Name                  | Type                    | Summary                                     |
| --------------------- | ----------------------- | ------------------------------------------- |
| offlineLabel          | String                  | Offline label.                              |
| onlineLabel           | String                  | Online label.                               |
| hideWhenOnline        | Boolean                 | Hide Online label if online.                |
| viewModel             | OfflineOnlineViewModel  | The view model for this widget.             |
| useNavigatorOnline\*   | Boolean                 | Use browser navigator.onLine. [false]      |
| pollingUrl\*           | String                  | Polling url (https://ipv4.icanhazip.com)   |
| pollingInterval\*      | Number                  | Polling Interval (ms).                     |
| pollingTimeout\*       | Number                  | Polling Timeout (ms).                      |
| pollingResponseType\*  | String                  | Polling [Response Type](https://developers.arcgis.com/javascript/latest/api-reference/esri-request.html#RequestOptions) ["text"].          |
| pollingHeaders\*       | String                  | Polling Headers [{}].                      |

\* = aliased

## OfflineOnlineViewModel

### Constructor:

#### new **OfflineOnlineViewModel(_properties?_)**

##### Property Overview:

| Name                  | Type                    | Summary                         |
| ----------------------| -------------------| -------------------------------------------|
| onlineStatus          | Boolean            | Current Online Status                      |
| useNavigatorOnline    | Boolean            | Use browser navigator.onLine. [false]      |
| pollingUrl            | String             | Polling url (https://ipv4.icanhazip.com)   |
| pollingInterval       | Number             | Polling Interval (ms).                     |
| pollingTimeout        | Number             | Polling Timeout (ms).                      |
| pollingResponseType   | String             | Polling [Response Type](https://developers.arcgis.com/javascript/latest/api-reference/esri-request.html#RequestOptions) ["text"].          |
| pollingHeaders        | String             | Polling Headers [{}].                      |


### **Examples:**

##### Default:

```
const Offlineonline = new OfflineOnlineWidget({});
view.ui.add(Offlineonline, "top-right);
```

##### Custom:

```
 const Offlineonline = new OfflineOnlineWidget({
     hideOnline: false,
     onlineLabel: "Connected",
     pollingUrl: "example.com/ping",
     pollingResponseType: "json"
 });
view.ui.add(Offlineonline, "top-right);
```

## Resources

- [ArcGIS JS API](https://developers.arcgis.com/javascript/)
- [ArcGIS JS API, Widget delvelopment](https://developers.arcgis.com/javascript/latest/guide/custom-widget/)
