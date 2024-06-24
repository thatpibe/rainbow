const SUPABASE_URL = 'https://oavvzmziysjwwfuuhqsx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdnZ6bXppeXNqd3dmdXVocXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3MzEyMjQsImV4cCI6MjAzNDMwNzIyNH0.YgHmLHEAA2JY4LIT3D5LntcHEp7Zq1uh_s8HN4ZHSo0'

var endDate = new Date()

const supabasePublicClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: {
        schema: "shield"
    }
});

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;
var dbCheckInterval = 10;

(function(){
    var f = function() {
        (async () => {
            if (dbCheckInterval == 10){
                const getRequestResponse = await supabasePublicClient.from("datetime").select("*")
                endDate = new Date(getRequestResponse.data[0].date + " " + getRequestResponse.data[0].time);
                dbCheckInterval = 0;
            }else{
                dbCheckInterval += 1;
            }
            var end = endDate;

            var now = new Date(moment(new Date()).tz('Europe/Paris').format('MM/DD/YYYY LTS').toLocaleString());
            var distance = end - now;
            if (distance < 0) {
                clearInterval(timer);
                document.getElementById("countdown").innerHTML = "Time's Up!";

                return;
            }
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            hours = String(hours).padStart(2,"0");
            minutes = String(minutes).padStart(2,"0");
            seconds = String(seconds).padStart(2,"0");
            var d = new Date(endDate);
            d.setHours(d.getHours() - 3);
            if(d > now){
                document.getElementById("countdown").innerHTML = `${hours}:${minutes}:${seconds}`;//document.getElementById("countdown").innerHTML = `Waiting...`;
            }else{
                document.getElementById("countdown").innerHTML = `${hours}:${minutes}:${seconds}`;
            }
            
        })()
    };
    timer = setInterval(f, 1000);
    f();
 })();
