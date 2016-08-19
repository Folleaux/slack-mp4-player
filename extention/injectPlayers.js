var template = '<video muted loop controls><source src="xxxxx" type="video/mp4"></video>';

function injectPlayers() {
    var mp4s = document.querySelectorAll('a[href$=".mp4"]:not([data-slack-mp4-player-touched])');

    for (var i = 0; i < mp4s.length; i++) {
        var mp4 = mp4s[i];
        var container = mp4.parentNode || mp4.parentElement;

        if (container) {
            var hasMessageBody = container.classList.contains('message_body');
            var isPreview = container.classList.contains('msg_inline_file_preview_toggler');
            var isFileContainer = container.classList.contains('file_container');
            var isRawLink = hasMessageBody && !isPreview;
            var isFileUpload = !hasMessageBody && isFileContainer;

            if (isRawLink || isFileUpload) {
                container.innerHTML = template.replace('xxxxx', mp4.href.replace('http:', ''));
            } else {
                mp4.setAttribute('data-slack-mp4-player-touched', '');
            }
        }
    }
}

setInterval(injectPlayers, 1000);
