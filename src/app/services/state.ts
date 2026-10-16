import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { RoomModel } from '../models/room.model';
import { AudioModel } from '../models/audio.model';
import { DeviceModel } from '../models/device.model';
import { ThemeModel } from '../models/theme.model';
import { ElementModel } from '../models/element.model';
import { ActionModel } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class State {
  audio: Signal<AudioModel> = signal({
    progVolume: 0,
    isProgMuted: false
  });
  
  initialized = signal(false);
  elements: WritableSignal<ElementModel[]> = signal([
    {
      id: "source1",
      component: "sourcebar",
      isEnabled: true,
      position: 0,
      label: "Laptop",
      activeLabel: "Laptop",
      icon: "laptop",
      activeIcon: "laptop",
      color: "black",
      activeColor: "white",
      description: "HDMI Laptop Source",
      isSelected: false,
      isDetected: false,
      actions: [] as ActionModel[],
      holdActions: [] as ActionModel[]
    },{
      id: "source2",
      component: "sourcebar",
      isEnabled: true,
      position: 0,
      label: "PC",
      activeLabel: "windows-logo",
      icon: "windows-logo",
      activeIcon: "pc",
      color: "black",
      activeColor: "white",
      description: "Built-in PC",
      isSelected: false,
      isDetected: false,
      actions: [],
      holdActions: []
    },{
      id: "source3",
      component: "sourcebar",
      isEnabled: true,
      position: 0,
      label: "Camera",
      activeLabel: "Camera",
      icon: "video-camera",
      activeIcon: "video-camera",
      color: "black",
      activeColor: "white",
      description: "HDMI Laptop Source",
      isSelected: false,
      isDetected: false,
      actions: [],
      holdActions: []
    },{
      id: "source4",
      component: "sourcebar",
      isEnabled: true,
      position: 0,
      label: "Wireless",
      activeLabel: "screencast",
      icon: "screencast",
      activeIcon: "pc",
      color: "black",
      activeColor: "white",
      description: "Built-in PC",
      isSelected: false,
      isDetected: false,
      actions: [],
      holdActions: []
    }
  ]);
  devices: Signal<DeviceModel[]> = signal([]);
  room: WritableSignal<RoomModel> = signal({
    isOn: false,
    routeUrl: "/home",
    systemIp: "",
    roomName: "Harvard Hall 101",
    selectedSourceId: "",
    selectedModeId: "",
    isAutoshutdownRunning: false,
    autoShutdownCount: 0,
    isAutoShutdownExpired: false,
    isAutoShutdownEnabled: false,
    isEventModeEnabled: false,
    isSupportConnected: false,
    description: "",
    dateTimeFormat: "",
    isLongPressEnabled: false,
    shutdownPagePrompt: ""
  });
  
  theme: Signal<ThemeModel> = signal({
    title: "",
    description: "",
    logoUrl: "",
    iconUrl: "",
    backgroundUrl: "",
    backgroundOnColor: "",
    backgroundOffColor: "",
    headerBackgroundColor: "",
    footerBackgroundColor: "",
    sourceBarButtonColor: "",
    sourceBarButtonActiveColor: "",
    buttonBarButtonColor: "",
    buttonBarButtonActiveColor: "",
    defaultButtonColor: "",
    defaultButtonActiveColor: "",
    volumeSliderColor: "",
    volumeSliderFillColor: "",
    volumeSliderKnobColor: "",
    fontStyle: "",
    fontSize: "",
  });
}
