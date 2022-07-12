/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

async function main() {
    await WA.onInit();
    WA.chat.sendChatMessage('Hello world', 'Mr Robot');
    await bootstrapExtra();
}

main();

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
