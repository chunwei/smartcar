/**
 * Created by chunwei on 2016/2/16.
 */
//!!! must import common.js first !!!  need LU.equals function
;(function($){
    window.LU=window.LU||{};
    $.fn.table=function(options){
        var defaults={
            cols:[],//col:{name:'key in row',title:'display name'}
            rows:[],
            actions:[],// action link in last col
            headClass:null,//table head style
            rowClass:null,//customized row style ,function(row){}
            num:false,//display row num ?
            rowOnClick:null
        };
        var settings=$.extend(defaults,options)
        var cols=settings.cols;
        var rows=settings.rows;
        var table=this;
        table.currentSelectRow=null;

        function createRowAction(row){
            var as=$.map(settings.actions, function (action) {
                var className="btn-default";
                if(!!action.className)className=action.className;
                var a=$("<a class='btn btn-link btn-sm "+className+"' href='#' role='button'>"+action.name+"</a>");
                if('function'==typeof action.fn)a.on('click',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    action.fn(row);
                });
                return a;
            });
            return $('<td align="center">').append(as);
        }
        var cols_ths=$.map(cols, function (col) {
            return '<th>'+col.title+'</th>';
        });
        if(settings.actions.length>0)cols_ths.push('<td  align="center">操作</td>');
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
            if(LU.equals(row,LU.currentSelectRow)){
                tr.addClass('selected');
                table.currentSelectRow=tr;
            }
            if(settings.num){tr.append('<th>'+(rownum+1)+'</th>')}
            tr.append($.map(cols, function (col) {
                return '<td>'+row[col.name]+'</td>';
            }));
            if(settings.actions.length>0)tr.append(createRowAction(row));
            return tr;
        });
        var tbody= $('<tbody>').append(trs);
        this.empty().append(thead).append(tbody);
        if("function" == typeof settings.rowOnClick) {
            this.off('click').on('click', 'tbody>tr', function () {
                if(!!table.currentSelectRow)table.currentSelectRow.removeClass('selected');
                $(this).addClass('selected');
                table.currentSelectRow= $(this);
                var selectedRow=rows[$(this).index()];
                settings.rowOnClick(selectedRow);
                table.data('currentSelectRow',selectedRow);
                window.LU.currentSelectRow=selectedRow;
            });
        }
        table.data('currentSelectRow',(!!window.LU.currentSelectRow)?window.LU.currentSelectRow:rows[0]);//默认选中第一行
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
            window.LU.currentSelectRow=null;//一旦翻页就应该忘记当前页中的选中行，下一页的第一行默认为选中行
            window.LU.pagination_params=params;
            if('function'==typeof onPageChange){
                onPageChange(params);
            }
        }

        return this;
    };
//key-value table
    $.fn.kvtable=function(options) {
        var defaults={
            cols:[],//col:{name:'key in row',title:'display name'}
            rows:[],
            actions:[],
            headClass:null,
            rowClass:null,
            colPerRow:1,//每行显示几对key-value
        };
        var settings=$.extend(defaults,options)
        var cols=settings.cols;
        var rows=settings.rows;
        var table=this;

        var rowCount=Math.ceil(cols.length/settings.colPerRow);
        var n=0;
        var tbody=$('<tbody>');
        for(var i=0;i<rowCount;i++){
            var tr=$('<tr>');
            for(var j=0;j<settings.colPerRow;j++) {
                var k=n<cols.length?cols[n].title:'';
                var v=rows[cols[n].name];
                if('undefined'==typeof v)v='-';
                tr.append("<td>"+k+"</td>");
                tr.append("<td class='value'>"+v+"</td>");
                n++;
            }
            tbody.append(tr);
        }
        return table.empty().append(tbody);
    };
})(jQuery);