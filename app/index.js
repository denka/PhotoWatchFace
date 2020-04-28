import clock from "clock";
import { me } from "appbit";
import { preferences } from "user-settings";

import * as activity from "./activity.js"
import * as statusBar from "./status_bar.js"
import * as settings from "./settings.js"
import * as time from "./time.js"

// Update the clock every second
clock.granularity = "seconds";

settings.loadSettings();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  
  statusBar.drawStatusBar(today);
  time.drawTime(today);
  activity.drawAllProgress();
  
  // if (HeartRateSensor) {
  //   const heartRateMonitor = new HeartRateSensor({ frequency: 1 });
  //   console.log('Denisse');
  //   console.log(heartRateMonitor.heartRate);
  //   heartRateMonitor.onreading = function() {
  //     console.log(heartRateMonitor.heartRate);
  //     statusBar.lblHeartRate.text = `${heartRateMonitor.heartRate}`;
  //   }
  //   heartRateMonitor.start();
  // }
}
