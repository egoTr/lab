const CONST_APP_NAME = 'lab/> notification-api';
const CONST_APP_ICON = '/img/app.png';

const btnAskPermission = document.getElementById('id-btn-ask-permission');
const btnNotify = document.getElementById('id-btn-notify');
const divLogger = document.getElementById('id-div-logger');

// Check if the browser supports notifications
function checkNotificationSupported() {
    if (!"Notification" in window) {
        divLogger.innerHTML += `<p>❌ Browser NOT support notifications;</p>`;
        return false;
    } // if

    divLogger.innerHTML += `<p>🍀 Browser DO supports notifications;</p>`;

    return Notification.permission;
} // checkNotificationSupported

// Function to check whether browser supports the promise version of requestPermission()
function checkNotificationPromise() {
    try {
        Notification.requestPermission().then();
        divLogger.innerHTML += `<p>🍀 Browser DO supports the promise version of requestPermission();</p>`;

        return true;
    } catch (e) {
        divLogger.innerHTML += `<p>❌ Browser NOT support the promise version of requestPermission();</p>`;

        return false;
    } // catch
} // checkNotificationPromise

function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if (!('permission' in Notification))
        Notification.permission = permission;

    if (Notification.permission === 'denied') {
        divLogger.innerHTML += `<p>😢 Notification permission DENIED;</p>`;

        btnAskPermission.setAttribute('disabled', true);
    } // if
    else if (Notification.permission === 'default') {
        divLogger.innerHTML += `<p>🐞 Notification permission UNKNOWN;</p>`;
        btnAskPermission.removeAttribute('disabled');
    } // else
    else { // else if permission === 'granted'
        divLogger.innerHTML += `<p>😁 Notification permission GRANTED;</p>`;

        btnAskPermission.setAttribute('disabled', true);
        btnNotify.removeAttribute('disabled');
    } // else
} // handlePermission

function askNotificationPermission() {
    if (checkNotificationPromise()) {
        Notification.requestPermission()
            .then((permission) => {
                handlePermission(permission);
            })
    } else {
        Notification.requestPermission(function (permission) {
            handlePermission(permission);
        });
    } // else if !checkNotificationPromise()
} // askNotificationPermission

function notify() {
    btnNotify.setAttribute('disabled', true);
    btnNotify.innerText = 'Notify soon';
    
    setTimeout(() => {
        const body = 'What a beautiful life !!!';
        const notification = new Notification(CONST_APP_NAME, { body, icon: CONST_APP_ICON });

        btnNotify.removeAttribute('disabled');
        btnNotify.innerText = 'Notify';
    }, 10000);
} // notify

window.onload = function () {
    const result = checkNotificationSupported();
    if (result)
        handlePermission(result);

    btnAskPermission.addEventListener('click', askNotificationPermission);
    btnNotify.addEventListener('click', notify);
} // window.onload