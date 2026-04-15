import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log(`[CRON] Ping success: ${res.status}`);
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (err) => console.error("[CRON] Ping failed:", err.message));
});

export default job;