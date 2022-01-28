/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Friday, January 28th 2022, 4:18:24 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

export default class WsClient {
    url;
    ws;
    emits = {};
    constructor(config = {}) {
        if (!WsClient.instance) {
            if (config.url) {
                this.url = config?.url;
            } else {
                if (window.location.protocol == 'http:') {
                    this.url = 'ws://' + window.location.host;
                } else {
                    this.url = 'wss://' + window.location.host;
                }
            }
            this.init();
            WsClient.instance = this;
        }
        return WsClient.instance;
    }

    init() {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = () => {
            if (this.emits.open) {
                this.emits.open.forEach(fun => {
                    fun();
                });
                this.emits.open = [];
            }
        };
        this.ws.onmessage = (event) => {
            if (this.emits.message) {
                this.emits.message.forEach(fun => {
                    let msg;
                    try {
                        msg = JSON.parse(event.data);
                        fun(msg);
                    } catch (e) {
                        fun({});
                    }
                });
                this.emits.message = [];
            }
        };
    }

    onopen(callback) {
        if (this.callback && typeof callback === 'function') {
            this.emits.open = this.emits.open || [];
            this.emits.open.push(callback);
        }
        return this;
    }

    onmessage(callback) {
        if (this.callback && typeof callback === 'function') {
            this.emits.message = this.emits.message || [];
            this.emits.message.push(callback);
        }
        return this;
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
        return this;
    }
}
