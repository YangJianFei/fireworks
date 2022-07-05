/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Friday, January 28th 2022, 6:22:25 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

import WsClient from "./websocket";

const wsClient = new WsClient();

const userName = localStorage.getItem('userName') || '';

if (userName) {
    wsClient.onopen(() => {
        wsClient.send({ content: `欢迎:${userName}`, color: '#3b86ff' });
    });
}