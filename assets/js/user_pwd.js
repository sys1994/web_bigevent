$(function() {
  var form = layui.form;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function(value) {
      if (value === $("[name=old_pwd]").val()) {
        return "新旧密码不能相同！";
      }
    },
    re_pwd: function(value) {
      if (value !== $("[name=new_pwd]").val()) {
        return "两次密码不一致！";
      }
    }
  });
  //   监听表单提交事件
  $(".layui-form").on("submit", function(e) {
    //   阻止默认提交行为
    e.preventDefault();
    // 发起ajax请求
    $.ajax({
      method: "PATCH ",
      url: "/my/updatepwd ",
      //   快速获取表单数据
      data: $(this).serialize(),
      //   回调函数if判断
      success: function(res) {
        if (res.code !== 0) {
          return layui.layer.msg("更新密码失败！");
        }
        layui.layer.msg("更新密码成功！");
        // 重置表单
        $(".layui-form")[0].reset();
      }
    });
  });
});
