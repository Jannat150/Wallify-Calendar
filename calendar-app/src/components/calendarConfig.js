import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.png";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const imageByKey = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
};

const imageThemes = {
  1: {
    from: "#2f9aa5",
    to: "#247982",
    tint: "rgba(26, 108, 116, 0.18)",
    accent: "#2f9aa5",
    accentSoft: "#e2f3f5",
    accentStrong: "#167fbe",
  },
  2: {
    from: "#5c6bc0",
    to: "#4351a8",
    tint: "rgba(55, 66, 140, 0.2)",
    accent: "#5c6bc0",
    accentSoft: "#e7e9f9",
    accentStrong: "#3d55b6",
  },
  3: {
    from: "#4b86c9",
    to: "#2e6bad",
    tint: "rgba(39, 83, 140, 0.2)",
    accent: "#4b86c9",
    accentSoft: "#e3eef9",
    accentStrong: "#2d7ac5",
  },
  4: {
    from: "#2f8f97",
    to: "#226a71",
    tint: "rgba(28, 88, 94, 0.2)",
    accent: "#2f8f97",
    accentSoft: "#e0f1f2",
    accentStrong: "#1f7fa8",
  },
  5: {
    from: "#3f9f68",
    to: "#2f8052",
    tint: "rgba(36, 110, 68, 0.2)",
    accent: "#3f9f68",
    accentSoft: "#e2f4e8",
    accentStrong: "#2f8d58",
  },
};

const monthImageKeys = [2, 3, 4, 1, 5, 1, 2, 3, 4, 5, 1, 2];

export function getMonthVisual(monthIndex) {
  const imageKey = monthImageKeys[monthIndex] ?? 1;

  return {
    image: imageByKey[imageKey],
    theme: imageThemes[imageKey],
  };
}
