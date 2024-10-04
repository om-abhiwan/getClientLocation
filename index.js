const express = require("express")
const app = express()
const axios = require("axios")


const cors = require("cors")
app.use(cors({ origin: '*' }))



app.use(express.json());




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
        console.log(response.data);
        var body = response.data;
        var locationData = {
            country_code: body.countryCode,
            country_name: body.country,
            region_code: body.region,
            city: body.city,
            // isp: body.isp,
            // zip_code: body.zip_code,
            // time_zone: body.timezone,
            // latitude: body.latitude,
            // longitude: body.longitude
        }
        console.log("locationData,", locationData);

        // ip2location.fetch(userIp).then((locationData) => {
        // });
        res.send({ success: true, location: locationData });
    } catch (err) {
        console.log(err);
        res.send({ success: false, location: null, message: err.message });
    }


})


app.listen(3111, () => {
    console.log(`Server is running on port 3111`);
});





