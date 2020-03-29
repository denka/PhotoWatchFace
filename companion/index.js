import * as messaging from "messaging";
import { outbox } from "file-transfer";
import { Image } from "image";
import { device } from "peer";
import { settingsStorage } from "settings";

settingsStorage.addEventListener("change", evt => {
  if (evt.oldValue !== evt.newValue) {
    sendValue(evt.key, evt.newValue);
  }
});

function sendValue(key, val) {
  if (val) {
    if (key === "background-image") {
      compressAndTransferImage(val);
    }else{
      sendSettingData({
        key: key,
        value: JSON.parse(val)
      });

    }
  }
}

function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
function compressAndTransferImage(settingsValue) {
  const imageData = JSON.parse(settingsValue);
  Image.from(imageData.imageUri)
    .then(image =>
      image.export("image/jpeg", {
        background: "#FFFFFF",
        quality: 40
      })
    )
    .then(buffer => outbox.enqueue(`${Date.now()}.jpg`, buffer))
    .then(fileTransfer => {
      // console.log(`Enqueued ${fileTransfer.name}`);
    });
}