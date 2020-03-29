import document from "document";
// import { preferences } from "user-settings";
// import { units } from "user-settings";
// import { user } from "user-profile";
import * as fs from "fs";
import * as messaging from "messaging";
import { me as appbit } from "appbit";
import { me as device } from "device";
// import { locale } from "user-settings";
import { display } from "display";
import { inbox } from "file-transfer";

import * as activity from "./activity.js"


// SETTINGS
export const SETTINGS_TYPE = "cbor";
export const SETTINGS_FILE = "settings.cbor";
export const DEFAULT_IMAGE_FILE = "imageDefault.jpg";
export let settings = loadSettings();
export let backgroundEl = document.getElementById('image-background');
export var language = "en";

export function applySettings() {
  if (! loadSettings) {
   return;
  }
  
  try {
    activity.distanceUnitSet((settings.hasOwnProperty("distanceUnit") && settings.distanceUnit.values) ? settings.distanceUnit.values[0].value : "m");

    if (settings.hasOwnProperty("isFastProgress")) {
      activity.isFastProgressSet(!!settings.isFastProgress);    
    }

    if (settings.hasOwnProperty("bg") && settings["bg"]) {
       backgroundEl.image = settings["bg"];  
    }else{
      backgroundEl.image = DEFAULT_IMAGE_FILE;
    }

    for (var i=0; i < activity.goalTypes.length; i++) {
      var goalTypeProp = activity.goalTypes[i] + "Color";
      if (settings.hasOwnProperty(goalTypeProp) && settings[goalTypeProp]) {
        activity.progressEls[i].container.style.fill = settings[goalTypeProp];
      }
    }
    activity.resetProgressPrevState();
  } catch (ex) {
    console.log(ex);
  }
}

applySettings();

export function onsettingschange(data) {
  if (!data) {
   return;
  }
  settings = data;
  applySettings();
}

messaging.peerSocket.addEventListener("message", function(evt) {
  if (!settings) {
    settings = {};
  }
  settings[evt.data.key] = evt.data.value;
  onsettingschange(settings);
})

appbit.addEventListener("unload", saveSettings);

export function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // console.log(ex);
    var defaults = {
      isHeartbeatAnimation: true,
      isFastProgress: false,
      language: 'en'
    };    
    
    if (units.distance === "us") {
      defaults["distanceUnit"] = { values:[{value:"mi"}]}; 
    }   
    return defaults;
  }
}

// Save settings to the filesystem
export function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
inbox.onnewfile = () => {
  let fileName;
  do {
    fileName = inbox.nextFile();
    if (fileName) {
      if (settings.bg && settings.bg !== "") {
        try {
          fs.unlinkSync(settings.bg);
        }catch (ex) {
          // console.log(ex);
        }
      }
      settings.bg = `/private/data/${fileName}`;
      applySettings();
    }
  } while (fileName);
};
