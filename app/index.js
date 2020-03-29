import clock from "clock";
import document from "document";
import { me } from "appbit";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";

import * as util from "../common/utils";
import * as activity from "./activity.js"
import * as settings from "./settings.js"

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const lblTime = document.getElementById("lbl-time");
const lblSeconds = document.getElementById("lbl-seconds");
const lblAmPm = document.getElementById("am-pm");
const lblDate = document.getElementById("lbl-date");
const lblDayOfWeek = document.getElementById("lbl-day-week");
const lblHeartRate = document.getElementById("lbl-heart-rate");
const lblBatteryLevel = document.getElementById("lbl-battery-level");
const timeContainer = document.getElementById("time-container");
var monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

settings.loadSettings();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
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
    timeContainer.x = 140;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
    timeContainer.x = 105;
  }
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  let montName = monthNames[today.getMonth()];
  let dayName = dayNames[today.getDay()];
  lblDate.text = `${montName} ${today.getDate()}`;
  lblDayOfWeek.text = `${dayName}`;
  lblTime.text = `${hours}:${mins}`;
  lblSeconds.text = `${secs}`;
  lblAmPm.text = `${amPm}`;
  lblBatteryLevel.text = `${battery.chargeLevel}%`;
  
  if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.onreading = function() {
      lblHeartRate.text = `${hrm.heartRate}`;
    }
    hrm.start();
  }
  
  activity.drawAllProgress();
  
}
