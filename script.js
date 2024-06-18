CountDownTimer('06/30/2024 8:0 PM', 'countdown');//countdown to the countdown
CountDownTimer('06/30/2024 11:0 PM', 'newcountdown');//countdown of the event

function CountDownTimer(dt, id)
{
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date(moment(new Date()).tz('Europe/Paris').format('MM/DD/YYYY LTS').toLocaleString());
        var distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(id).innerHTML = "TIME'S UP!";

            return;
        }
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        
    document.getElementById(id).innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    timer = setInterval(showRemaining, 1000);
}
