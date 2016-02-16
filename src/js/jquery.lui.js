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
        var defaults={
            currentPage:1,
            hasNextPage:false,
            hasPreviousPage:false,
            pageSize:10,
            startIndex:0,
            totalCount:1,
            totalPage:1
        };
        var settings=$.extend(defaults,options);

        var pagination=$(
            "<ul class='pagination pagination-sm'>"+
            "<li><a>首页</a></li>"+
            "<li><a>上一页</a></li>"+
            "<li><a>下一页</a></li>"+
            "<li><a>尾页</a></li>"+
            "</ul>");

        var totalpage=$("<span class='input-group-addon'></span>").text('共'+settings.totalPage+'页');
        var select=$("<select class='form-control'>");
        for(var i=1;i<=settings.totalPage;i++){
            var selected=i==settings.currentPage?"selected='selected'":"";
            select.append("<option value='"+i+"' "+selected+">第"+i+"页</option>");
        }
        select.on('change',function(){console.log($(this).val())});
        var inputgroup=$("<div class='input-group input-group-sm pagergroup'>");
        inputgroup.append(totalpage).append(select);
        this.empty().append(pagination).append(inputgroup);

        this.on('click','ul>li',function(e){
            e.preventDefault();
            var targetPage=settings.currentPage;
            switch ($(this).index()){
                case 0:targetPage=1;break;
                case 1:targetPage-=1;break;
                case 2:targetPage+=1;break;
                case 3:targetPage=settings.totalPage;break;
            }
            console.log($(this).index()+"::"+targetPage);
        });

        return this;
    };
})(jQuery);