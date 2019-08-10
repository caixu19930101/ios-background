(function(global){
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    var type = getQueryString('type');

    $('.addinfo_btn').on('click', function(){
        if(!type){
            return;
        }
        var title = $('#title').val();
        var content = $('#content').val();
        var obj = {
            type: type,
            title: title,
            content: content
        };

        $.ajax({
            type: 'POST',
            url: '/data/write',
            data: obj,
            success: function(data){
                if(data.status){
                    alert('添加数据成功');
                    window.location.reload();
                }else{
                    alert('添加失败1');
                }
            },
            error: function(){
                alert('添加失败');
            },
            dataType: 'json'
        });

    });


})(window);