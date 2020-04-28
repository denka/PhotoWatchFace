import document from "document";
import * as util from "../common/utils";

import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { battery } from "power";
import { preferences } from "user-settings";


export let topBar = document.getElementById('top-bar');
export let bottomBar = document.getElementById('bottom-bar');
export let lblDayOfWeek = document.getElementById("lbl-day-week");
export let lblHeartRate = document.getElementById("lbl-heart-rate");
export let lblBatteryLevel = document.getElementById("lbl-battery-level");
export let lblDate = document.getElementById("lbl-date");
export let iconHeartRate = document.getElementById("icon-heart-rate");
export let hrm = new HeartRateSensor({ frequency: 1});
export var prevHrmRate = null;
export var hrmRate = null;
export var monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
export var dayNames = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

export function drawStatusBar(today){
  let montName = monthNames[today.getMonth()];
  let dayName = dayNames[today.getDay()];
  lblDate.text = `${montName} ${today.getDate()}`;
  lblDayOfWeek.text = `${dayName}`;
  lblBatteryLevel.text = `${battery.chargeLevel}%`; 
  // iconHeartRate.style.display = "none";
}

export function startHrm(){
  hideHr();
  if (HeartRateSensor) {
    hrm.onreading = drawHrm;
    hrm.start();
    
    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      display.on ? hrm.start() : hrm.stop();
    });
  }   
  
}

export function hideHr() {
   hrmRate = null;
   prevHrmRate = null;
   iconHeartRate.style.display = "none";
}

export function drawHrm(){
  hrmRate = hrm.heartRate;
  if(hrmRate && display.on) {
    lblHeartRate.text = `${hrmRate}`;
    iconHeartRate.style.display = "inline";
  }else{
    hideHr();
  }
}

startHrm();

