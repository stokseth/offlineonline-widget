/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { subclass, declared, property, aliasOf } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { renderable, tsx } from "esri/widgets/support/widget";
import Handles = require("esri/core/Handles");
import OfflineOnlineViewModel = require("./OfflineOnline/OfflineOnlineViewModel");

const CSS = {
    base: "customwidget-offlineonline",
    symbol: "customwidget-offlineonline-symbol",
    symbolOnline: "customwidget-offlineonline-symbol--online",
    symbolOffline: "customwidget-offlineonline-symbol--offline",
    label: "customwidget-offlineonline-label",
    labelOffline: "customwidget-offlineonline-label--offline",
    labelOnline: "customwidget-offlineonline-label--online",
    hide: "esri-hidden"
};

@subclass("Customwidgets.offlineonline")
class OfflineOnline extends declared(Widget) {
    // Variables
    private _handles: Handles | any = new Handles();

    //----------------------------------
    //  OfflineLabel
    //----------------------------------
    @property()
    @renderable()
    offlineLabel: string = "Offline";

    //----------------------------------
    //  OnlineLabel
    //----------------------------------
    @property()
    @renderable()
    onlineLabel: string = "Online";

    //----------------------------------
    //  HideOnline
    //----------------------------------
    @property()
    @renderable()
    hideWhenOnline: boolean = false;

    //----------------------------------
    //  Use navigator-onLine first 
    //----------------------------------
    @property()
    @aliasOf("viewModel.useNavigatorOnline")
    @renderable()
    useNavigatorOnline: boolean = false;


    //----------------------------------
    //  Polling Url
    //----------------------------------
    @property()
    @aliasOf("viewModel.pollingUrl")
    pollingUrl: string = "https://ipv4.icanhazip.com";

    //----------------------------------
    //  polling Interval (ms)
    //----------------------------------    
    @property()
    @aliasOf("viewModel.pollingInterval")
    pollingInterval: number = 5000;

    //----------------------------------
    //  polling Timeout (ms)
    //----------------------------------    
    @property()
    @aliasOf("viewModel.pollingTimeout")
    pollingTimeout: number = 5000;

    //----------------------------------
    //  Polling Response Type ["text"]
    //----------------------------------
    @property()
    @aliasOf("viewModel.pollingResponseType")
    pollingResponseType: string = "text";

    //----------------------------------
    //  Polling Headers [{}]
    //----------------------------------
    @property()
    @aliasOf("viewModel.pollingHeaders")
    pollingHeaders: any = {};


    // viewModel
    @property()
    @renderable([
        "viewModel.onlineStatus"
    ])
    viewModel: OfflineOnlineViewModel = new OfflineOnlineViewModel();


    // Lifecycles methods
    constructor() {
        super();
    }

    postInitialize() {
        this.viewModel.initialize();
    }

    destroy() {
        this._handles.removeAll();
        this._handles.destroy();
        this._handles = null;
    }

    render() {
        const status = this.viewModel.onlineStatus;
        const classesBase = {
            [CSS.hide]: status && this.hideWhenOnline
        };

        const classesSymbol = {
            [CSS.symbolOnline]: status,
            [CSS.symbolOffline]: !status
        };
        const classesLabel = {
            [CSS.labelOnline]: status,
            [CSS.labelOffline]: !status
        };

        const label = status ? this.onlineLabel : this.offlineLabel;
        return (
            <div class={this.classes(CSS.base, classesBase)}>
                <div class={this.classes(CSS.symbol, classesSymbol)}></div>
                <div class={this.classes(CSS.label, classesLabel)}>{label}</div>
            </div>
        );
    }
}

export = OfflineOnline;