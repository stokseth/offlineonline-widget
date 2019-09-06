/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />


import Accessor = require("esri/core/Accessor");
import Handles = require("esri/core/Handles");
import esriRequest = require("esri/request");
import { subclass, declared, property } from "esri/core/accessorSupport/decorators";



@subclass("Customwidgets.offlineonlineViewModel")
class OfflineOnlineViewModel extends declared(Accessor) {
    // Variables
    private _handles: Handles | any = new Handles();


    //----------------------------------
    //  Current OnlineStatus
    //----------------------------------
    @property()
    onlineStatus: boolean = true;

    //----------------------------------
    //  Use navigator.onLine if supported 
    //----------------------------------
    @property()
    useNavigatorOnline: boolean = false;

    //----------------------------------
    //  Polling Url
    //----------------------------------
    @property()
    pollingUrl: string = "https://ipv4.icanhazip.com";

    //----------------------------------
    //  polling Interval (ms)
    //----------------------------------    
    @property()
    pollingInterval: number = 5000;

    //----------------------------------
    //  polling Timeout (ms)
    //----------------------------------    
    @property()
    pollingTimeout: number = 5000;

    //----------------------------------
    //  Polling Response Type ["text"]
    //----------------------------------
    @property()
    pollingResponseType: string = "text";

    //----------------------------------
    //  Polling Headers [{}]
    //----------------------------------
    @property()
    pollingHeaders: any = {};




    //----------------------------------
    //
    //  Public Methods
    //
    //----------------------------------
    initialize() {
        if (this.useNavigatorOnline && navigator.onLine) {
            // use navigator online API
            window.addEventListener('online', () => { this._changeOnlineStatus(true); });
            window.addEventListener('offline', () => { this._changeOnlineStatus(false); });
        } else {
            // default check status by polling
            this._handles.add(
                setInterval(() =>
                    this._checkOnlineByPolling(),
                    this.pollingInterval
                )
            );
        }
    }

    destroy() {
        this._handles.removeAll();
        this._handles = null;

        if (this.useNavigatorOnline && navigator.onLine) {
            window.removeEventListener('online', () => { this._changeOnlineStatus(true); });
            window.removeEventListener('offline', () => { this._changeOnlineStatus(false); });
        }
    }

    //----------------------------------
    //
    //  Private Methods
    //
    //----------------------------------
    private _checkOnlineByPolling(): void {
        esriRequest(this.pollingUrl, {
            responseType: this.pollingResponseType,
            headers: this.pollingHeaders,
            timeout: Math.min(this.pollingTimeout, this.pollingInterval)
        }).then((response: any) => {
            this._changeOnlineStatus(true);
        }).otherwise((e: any) => {
            this._changeOnlineStatus(false);
        });
    }

    private _changeOnlineStatus(status: boolean) {
        if (status !== this.onlineStatus) {
            this.onlineStatus = status;
        }
    }
}

export = OfflineOnlineViewModel;