import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { SelectedChannelStore } from "@webpack/common";
import { Message } from "discord-types/general";

interface IMessageCreate {
    type: "MESSAGE_CREATE";
    optimistic: boolean;
    isPushNotification: boolean;
    channelId: string;
    message: Message;
}

const settings = definePluginSettings({
    deepRock: {
        description: "Hop on Deep Rock?",
        type: OptionType.BOOLEAN,
        default: false,
        stickToMarkers: false
    },
    bloons: {
        description: "Hop on BloonsTD6?",
        type: OptionType.BOOLEAN,
        default: true,
        stickToMarkers: false
    },
    beaverClicker: {
        description: "Hop on Beaver Clicker?",
        type: OptionType.BOOLEAN,
        default: false,
        stickToMarkers: false
    },
});

export default definePlugin({
    name: "Hop on Deep Rock",
    description: "You should really hop on!",
    authors: [
        {
            id: 725539745572323409n,
            name: "Twig",
        },
    ],
    settings,
    flux: {
        async MESSAGE_CREATE({ optimistic, type, message, channelId }: IMessageCreate) {
            if (optimistic || type !== "MESSAGE_CREATE") return;
            if (channelId !== SelectedChannelStore.getChannelId()) return;
            if (message.state === "SENDING") return;
            if (!message.content) return;
            if (settings.store.deepRock) {
                if (message.content.toLowerCase().includes("hop on deep rock")) {
                    VencordNative.native.openExternal("steam://rungameid/548430");
                }
            }
            if (settings.store.bloons) {
                if (message.content.toLowerCase().includes("hop on bloons")) {
                    VencordNative.native.openExternal("steam://rungameid/960090");
                }
            }
            if (settings.store.beaverClicker) {
                if (message.content.toLowerCase().includes("hop on beaver clicker")) {
                    VencordNative.native.openExternal("steam://rungameid/1718240");
                }
            }
        }
    },
});
