const express = require("express")
const app = express()
const axios = require("axios")
const cron = require("node-cron")

const cors = require("cors")
app.use(cors({ origin: '*' }))



app.use(express.json());


cron.schedule("*/03 * * * * *",()=>{
    console.log("server running")
})



app.get("/", async (req, res) => {
    function GetUserIp(req) {
        // Get the IP from the 'x-forwarded-for' header, if available, or fall back to the remote address
        var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        // If the 'x-forwarded-for' contains multiple IPs, take the first one (client's IP)
        if (ip.includes(',')) {
            ip = ip.split(',')[0].trim();
        }

        return ip;
    }

    try {
        // var userIp = req.body.userIp
        var userIp = GetUserIp(req);
        console.log("user ip ", userIp);
        var APIURI = "http://ip-api.com/json/";
        var finalURL = APIURI + userIp;
        // console.log("Using  this URL : ", finalURL);
        const response = await axios.get(finalURL);
        
        // ip2location.fetch(userIp).then((locationData) => {
        // });
        res.send({ success: true, location: response });
    } catch (err) {
        console.log(err);
        res.send({ success: false, location: null, message: err.message });
    }


})


app.listen(3111, () => {
    console.log(`Server is running on port 3111`);
});





