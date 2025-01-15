import toast from "react-hot-toast";

export function notificationFromData(data: { message: string }) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    console.log("Permission:", Notification.permission);

    try {
      const notification = new Notification(data?.message, {
        body: "A new event. has been added to your dashboard. Check it out and manage your registrations now!",
      });
      console.log("Notification sent:", notification);
    } catch (error) {
      console.error("Notification error:", error);
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      console.log("Permission requested:", permission);
      if (permission === "granted") {
        try {
          const notification = new Notification(data?.message, {
            body: "You enabled notifications. This is a test push notification.",
          });
          console.log("Notification sent after permission:", notification);
        } catch (error) {
          console.error("Notification error after permission:", error);
        }
      } else {
        alert("Notification permissions denied.");
      }
    });
  } else {
    toast.success(data?.message);
  }
}
