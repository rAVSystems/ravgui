export interface RoomModel {
    isOn: boolean;
    routeUrl: string;
    systemIp: string;
    roomName: string;
    selectedSourceId: string;
    selectedModeId: string;
    isAutoshutdownRunning: boolean;
    autoShutdownCount: number;
    isAutoShutdownExpired: boolean;
    isAutoShutdownEnabled: boolean;
    isEventModeEnabled: boolean;
    isSupportConnected: boolean;
    description: string;
    dateTimeFormat: string;
    isLongPressEnabled: boolean;
    shutdownPagePrompt: string;
}