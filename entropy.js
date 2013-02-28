(function( $ ) {
    $.fn.entropy = function(callback) {

        var entropy_result = '';
        var entropy_percent = 0;

        function reset() {
            $('#entropyProgress').width("0%");
            entropy_result = '';
            entropy_percent = 0;
        }

        var entropy_modal = '\
        <div id="entropyModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="entropyModalLabel" aria-hidden="true">\
            <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
                <h3 id="entropyModalLabel">Entropy</h3>\
            </div>\
            <div class="modal-body">\
                <p>Move your mouse over the grey zone to create entropy.</p>\
                <table id="entropyTable"></table>\
                <div class="progress">\
                    <div class="bar" id="entropyProgress" style="width: 0%;"></div>\
                </div>\
            </div>\
            <div class="modal-footer">\
                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>\
            </div>\
        </div>\
        ';
        var html_table = '';
        for (var i=0;i<100;i++) {
            html_table = html_table + '<tr cy="' + i + '">';
            for (var j=0;j<100;j++) {
                html_table = html_table + '<td class="entropyTd" cx="' + j + '"></td>';
            }
            html_table = html_table + '</tr>';
        }
        $('body').append(entropy_modal);
        $('#entropyTable').html(html_table);

        $('.entropyTd').mouseenter(function(){
            if (entropy_percent < 100) {
                entropy_percent += 5;
                $('#entropyProgress').width(entropy_percent + "%");
                entropy_result = entropy_result + $(this).attr('cx') + $(this).parent().attr('cy');
            } else {
                $('#entropyModal').modal('hide');
                callback.call(this, entropy_result);
            }
        });

        this.click(function(){
            reset();            
            $('#entropyModal').modal('show');
        });
        return this;
    };
})( jQuery );