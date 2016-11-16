'use strict'
module.exports = function () {
    var unxss = require('unxss');
    var escapeScript = unxss.escape;
    $('#contact-form').validator();
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        if (this.elements[0].className === 'close') {
            this.removeChild(this.children[0]);
        }
        var data = {
            firstName: escapeScript(this.elements[0].value),
            lastName: escapeScript(this.elements[1].value),
            phone: escapeScript(this.elements[2].value),
            email: escapeScript(this.elements[3].value),
            comments: escapeScript(this.elements[4].value),
            eventType: escapeScript(this.elements[5].value),
            eventDate: escapeScript(this.elements[6].value),
            eventLocation: escapeScript(this.elements[7].value),
            talent: escapeScript(this.elements[8].value),
            eventStart: escapeScript(this.elements[9].value),
            eventDuration: escapeScript(this.elements[10].value)
        };
        var url = "/contact";
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (data) {
                console.log('returned', data)
                var messageAlert = 'alert-' + (data.success ? 'success' : 'warning');
                var messageText = data.message;

                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                }
            }
        });
    })
};
