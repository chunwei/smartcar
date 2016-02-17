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

    $.fn.pagination=function(options,onPageChange){
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
            "<li><a href='#'>首页</a></li>"+
            "<li><a href='#'>上一页</a></li>"+
            "<li><a href='#'>下一页</a></li>"+
            "<li><a href='#'>尾页</a></li>"+
            "</ul>");
        pagination.find('li').each(function () {
            var disabled=false;
            switch ($(this).index()){
                case 0:if(settings.currentPage==1)disabled=true;break;
                case 1:if(!settings.hasPreviousPage)disabled=true;break;
                case 2:if(!settings.hasNextPage)disabled=true;break;
                case 3:if(settings.currentPage==settings.totalPage)disabled=true;break;
            }
            if(disabled)$(this).addClass('disabled');
        });

        var totalpage=$("<span class='input-group-addon'></span>").text('共'+settings.totalPage+'页');
        var select=$("<select class='form-control'>");
        for(var i=1;i<=settings.totalPage;i++){
            var selected=i==settings.currentPage?"selected='selected'":"";
            select.append("<option value='"+i+"' "+selected+">第"+i+"页</option>");
        }
        var inputgroup=$("<div class='input-group input-group-sm pagergroup'>");
        inputgroup.append(totalpage).append(select);
        this.empty().append(pagination).append(inputgroup);

        select.on('change',function(){
            var targetPage=$(this).val();
            next(targetPage);
        });
        pagination.on('click','li',function(e){
            e.preventDefault();
            if($(this).hasClass('disabled'))return;
            var targetPage=settings.currentPage;
            switch ($(this).index()){
                case 0:targetPage=1;break;
                case 1:targetPage-=1;targetPage=Math.max(1,targetPage);break;
                case 2:targetPage+=1;targetPage=Math.min(settings.totalPage,targetPage);break;
                case 3:targetPage=settings.totalPage;break;
            }
            next(targetPage);
        });

        function next(targetPage){console.log('go page: '+targetPage);
            var params= {
                    filter:null,
                    pagination:$.extend(settings, {currentPage: targetPage}),
                };
            if('function'==typeof onPageChange){
                onPageChange(params);
            }
        }

        return this;
    };
})(jQuery);