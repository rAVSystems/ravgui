import { AudioModel } from "./audio.model";
import { ElementModel } from "./element.model";
import { DeviceModel } from "./device.model";
import { RoomModel } from "./room.model";
import { ThemeModel } from "./theme.model";

export interface StateModel {
    room: RoomModel;
    devices: DeviceModel[];
    elements: ElementModel[];
    audio: AudioModel;
    theme: ThemeModel;
}