document.addEventListener('DOMContentLoaded', function () {
    // Load the date picker view
    loadDateTimeView();

    // Check if the selected the start and end date
    document.querySelector("form").onsubmit = loadCountDownView;
});

function loadDateTimeView() {
    document.querySelector("#countDownView").style.display = "none";
    document.querySelector("#dateView").style.display = "block";
}

function loadCountDownView() {
    document.querySelector("#countDownView").style.display = "block";
    document.querySelector("#dateView").style.display = "none";

    const caption = document.querySelector("#caption-input").value
    if (caption)
        document.querySelector("#caption").innerHTML = caption;
    // Instantiate new date objects
    const end = convert(document.querySelector("#end").value);

    // Set up the initial countdown
    countDown(end);

    // Update the countdown every second
    setInterval(function () {
        countDown(end);
    }, 1000);
    
    return false;
}

function convert(date) {
    date = date.split("-");
    
    let year = parseInt(date[0]);
    let month = get_month(parseInt(date[1]) - 1);
    let day = parseInt(date[2]);
    
    return new Date(`${day} ${month} ${year}`);
}
function countDown(end) {
    let start = new Date();

    let totalSeconds = (end - start) / 1000;
    let days = Math.floor(totalSeconds / 3600 / 24);
    let hours = Math.floor(totalSeconds / 3600) % 24;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let seconds = Math.floor(totalSeconds) % 60;

    days = formatNumber(days);
    hours = formatNumber(hours);
    minutes = formatNumber(minutes);
    seconds = formatNumber(seconds);

    if (!isNaN(totalSeconds)) {
        document.querySelector("#days").innerHTML = days;
        document.querySelector("#hours").innerHTML = hours;
        document.querySelector("#minutes").innerHTML = minutes;
        document.querySelector("#seconds").innerHTML = seconds;
    }
}
function get_month(month_num) {
    const months = get_months();
    return months[month_num];
}
function get_months() {
    const months = new Array(12)
        .fill(0)
        .map((_, index) => {
            const month = new Date(2023, index, 1);
            return month.toLocaleString('en-US', { month: 'short' });
        });
    return months
}
function formatNumber(number) {
    return number.toString().padStart(2, '0');
}