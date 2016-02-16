/**
 * Created by chunwei on 2016/2/16.
 */
;(function($){
    $.fn.table=function(options){
        var defaults={
            cols:[],
            rows:[],
            headClass:null,
            rowClass:null,
            num:false,
            rowOnClick:null
        };
        var settings=$.extend(defaults,options)
        var cols=settings.cols;
        var rows=settings.rows;
        var cols_ths=$.map(cols, function (col) {
            return '<th>'+col.title+'</th>';
        });
        var tr=$('<tr>');
        if ("string" == typeof settings.headClass){tr.addClass(settings.headClass);}
        if(settings.num){tr.append('<th>#</th>')}
        var thead= $('<thead>');
        thead.append(tr.append(cols_ths));
        var trs= $.map(rows,function(row,rownum){
            var rc;
            if(!!settings.rowClass) {
                if ("string" == typeof settings.rowClass){
                    rc = rowClass;
                }else if("function" == typeof settings.rowClass){
                    rc=settings.rowClass(row)
                }
            }
            var tr=$('<tr>');
            if(!!rc)tr.addClass(rc);
            if(settings.num){tr.append('<th>'+(rownum+1)+'</th>')}
            return tr.append($.map(cols, function (col) {
                return '<td>'+row[col.name]+'</td>';
            }));
        });
        var tbody= $('<tbody>').append(trs);
        this.empty().append(thead).append(tbody);
        if("function" == typeof settings.rowOnClick)
        this.off('click').on('click','tbody>tr',function(){settings.rowOnClick(rows[$(this).index()]);});
        return this;
    };

    $.fn.pagination=function(options){
        var defaults={};
        var settings=$.extend(defaults,options);
        return this;
    };
})(jQuery);