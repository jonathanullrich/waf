/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { connect } from 'enstadtpfaff-platform-mock-api';

console.log('Script started successfully');

let currentPopup: any = undefined;

const DEFAULT_MQTT_ADDRESS = "ssl://broker.platform.pfaffhack.de:8883";
const DEFAULT_MQTT_USERNAME = "pfaffhack2021";
const DEFAULT_MQTT_PASSWORD = "kaiserslautern";
const DEFAULT_SENDER_NAME = 'TesterJ';

const platformMockApi = connect(
    process.env.CONFIG_MQTT_ADDRESS || DEFAULT_MQTT_ADDRESS,
    process.env.CONFIG_MQTT_USERNAME || DEFAULT_MQTT_USERNAME,
    process.env.CONFIG_MQTT_PASSWORD || DEFAULT_MQTT_PASSWORD,
    process.env.CONFIG_SENDER_NAME || DEFAULT_SENDER_NAME,
    function (event) {
      console.log(`message arrived on topic ${event.topic}: ${event.payload}`);
    }
);

const eventBroker = platformMockApi.eventBroker;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.chat.sendChatMessage('Hello world', 'Mr Robot');
    // WA.chat.onChatMessage((message => {
    //     // publish an Event using the provided EventBuilder for custom Events
    //     eventBroker.publish(
    //         createEvent(
    //             // utility function helps you in forming valid topic named that comply to Topic Management
    //             nameForServiceSpecificTopic('Workadventure'),
    //             // The Payload is a string or will be serialized using JSON.stringify
    //             message
    //         )
    //     );
    // }));

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
