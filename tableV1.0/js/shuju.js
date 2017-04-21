$(function(){
    var sta=0;
    $(".sanjiao").on("click",function(){
      if(sta == 0){
          sta=1;
          $(".sanjiao").css({"border-bottom":"10px solid red","border-top":"none"});
      }else{
          sta=0;
           $(".sanjiao").css({"border-top":"10px solid red","border-bottom":"none"});
      }
    })
})//排序
$(function(){
    $("#chxAll").on("click",function(){
        if($(this).is(":checked")){
                $("input[name=chbox]").prop("checked",true);  
            }else{
                $("input[name=chbox]").prop("checked",false); 
            }
    })
})

$(function(){
    $(".btns").click(function(){  
        $("input[name='chbox']:checked").each(function(){//遍历选中的checkbox
            tb=$(this).parents("tr").index(); //索取checkbox的父节点然后获取它们的索引
            $("#test_tbody").find("tr:eq("+ tb +")").remove();//获取body的子元素，当它们的索引为chebox时，将其去掉
        })
    })
})

$(function(){
    function inithtml(json){
        var html_ = '<tr>' +
                       '<td><input type="checkbox" name="chbox"><input class="test" type="text" value="' + json.id + '" disabled></td>' +
                        '<td> <input class="test" type="text" value="' + json.fenlei + '" disabled></td>' +
                        '<td><input class="test" type="text" value="' + json.tit + '" disabled></td>' +
                        '<td><input class="test" type="text" value="' + json.banji + '" disabled></td>' +
                        '<td><input class="test" type="text" value="' + json.zhuangtai + '" disabled></td>' +
                        '<td><input class="test" type="text" value="' + json.cjtime + '" disabled></td>' +
                        '<td><input class="test" type="text" value="' + json.cjer + '" disabled></td>' +
                        '<td><input class="test" type="text" value="' + json.diqu + '" disabled></td>' +
                        '<td> <input type="button" value="删除该行" title="'+ json.id +'" class="btnn"> <td>' +
                    '</tr>';
        return html_;
    }
    
    function initPage(data){
        $("tbody").html("");
       $.each(data,function(key,val){
               $("tbody").append(inithtml(val));
               })    
}
    
   initPage(data);
//    function delFun(id){
//      
//    }
   $("body").on("click",".btnn",function(){
       var id=parseInt($(this).attr("title")); //定义ID 拿到tit的值
         var ind = $(this).parent("td").parent("tr").index();
        for(var i=0; i<data.length;i++){
           if(id == data[i].id){
               data.splice(i,1); //删除数组
               $("tbody tr").eq(ind).remove(); //删除表格
           }
       }
   
   })
    var id_=null;
    $.each(data,function(key,val){
        if(id_ < val.id){
            id_ = val.id + 1;
        }
    })
    function refreshHtml(data,class_){
        data.unshift({
            id:id_,
            fenlei: $(class_.fenlei).val(),
            tit: $(class_.tit).val(),
            banji: $(class_.banji).val(),
            zhuangtai: $(class_.zhuangtai).val(),
            cjtime: $(class_.cjtime).val(),
            cjer: $(class_.cjer).val(),
            diqu: $(class_.diqu).val()
        })
        
        $(".luru input[type='text']").val("");
        initPage(data);
    }
    $(".btn").on("click",function(){
        id_ = id_ + 1;
        refreshHtml(data,{id:id_, fenlei:'.fenlei',tit:'.tit',banji:'.banji',zhuangtai:'.zhuangtai',cjtime:'.cjtime',cjer:'.cjer',diqu:'.diqu'});
    })
    function dealList(data,status,fun){
        if(status){
            //从小到大
            var emp = null;
            for(var i = 0;i < data.length;i++){
                for(var j=i+1; j<data.length; j++){
                    if(data[i].id > data[j].id){
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
        }else{
            //从大到小
            for(var i = 0;i < data.length;i++){
                for(var j=i+1; j<data.length; j++){
                    if(data[i].id < data[j].id){
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
        }
        fun();
    }
    $(".sanjiao").on("click",function(){
        //反向
        if($(this).hasClass("h")){
            dealList(data,true,function(){          
                initPage(data);
            })
            $(this).removeClass("h");
        }else{
            //正向
            dealList(data,false,function(){
                initPage(data);
            })
            $(this).addClass("h");
        }
    })
    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
    
    $(window).keydown(function(e){
        var key=e.keyCode;
//        alert(key);
        switch(key){
            case 38:
                index = $("tr.bg").index();
                if(index > 0){
                index --;
                  }
                $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 40:
                index = $("tr.bg").index();
                if(index < $('tbody tr').length - 1){
                index ++;
                  }
                 $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 46:
             $("tbody tr").eq(index).remove("tbody tr");
//                delFun(id)
                break;
            case 13:
               index = $("tr.bg").index()+1;
                if($("input[name=chbox]").eq(index).is(':checked')){
                    
                     $("input[name=chbox]").eq(index).prop("checked",false); 
                }else{
                  
                    $("input[name=chbox]").eq(index).prop("checked",true); 
                  
                }
                     
               }
    })
    $("body").on("click", "td", function(){
		$(this).children("input").removeAttr("disabled");
	})
	
	$("body").on("blur", "td", function(){
		$(this).children("input").attr("disabled", true);
	})	
   
  })


