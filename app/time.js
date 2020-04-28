import document from "document";
import * as util from "../common/utils";
import { preferences } from "user-settings";

export let root = document.getElementById('root')
export const screenHeight = root.height //250 - Ionic, 300 - Versa
export const screenWidth = root.width

const timeContainer = document.getElementById("time-container");
export let lblTime = document.getElementById("lbl-time");
export let lblSeconds = document.getElementById("lbl-seconds");
export let lblAmPm = document.getElementById("am-pm");

export function drawTime(today) {
  let hours = today.getHours();
  var amPm = "";
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    if (hours < 12) {
      amPm = " AM";
    } else {
      amPm = " PM";
    }
    hours = hours % 12 || 12;
    timeContainer.x = screenWidth - 185;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
    timeContainer.x = screenWidth - 200;
  }
  setSecDeviceTypePosition();
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  
  lblTime.text = `${hours}:${mins}`;
  lblSeconds.text = `${secs}`;
  lblAmPm.text = `${amPm}`;
}

export function setSecDeviceTypePosition() {
   if (screenHeight === 300) {
     timeContainer.y = 60;
   } else {
     timeContainer.y = 42;
   }
}
