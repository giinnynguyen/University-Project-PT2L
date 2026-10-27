/**get base url of web*/
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host;
console.log(baseUrl);

//sản phẩm
var product ;

var ct_don_hang ;
//tài khoản
var accounts;
var khach_hang;

//hãng
var company;

var don_hang;
//download

var loaiAccount = null;
if(!localStorage.loaiAccount){
  loaiAccount = localStorage.loaiAccount;
}

if (!localStorage.ct_don_hang ) {
  $.getJSON(baseUrl+ "/admin/js/ct_don_hang.json", function( data ) {
    window.localStorage.ct_don_hang  = encodeURIComponent(JSON.stringify(data));
    ct_don_hang= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.ct_don_hang))) );

  });
}else
ct_don_hang= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.ct_don_hang))) );


if (!localStorage.khach_hang ) {
  $.getJSON(baseUrl+ "/admin/js/khach_hang.json", function( data ) {
    window.localStorage.khach_hang  = encodeURIComponent(JSON.stringify(data));
    khach_hang= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.khach_hang))) );

  });
}else
khach_hang= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.khach_hang))) );

         //
         if (!localStorage.product ) {

          $.getJSON(baseUrl+ "/admin/js/product.json", function( data ) {
            window.localStorage.product  = encodeURIComponent(JSON.stringify(data));
            product= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.product))));
          });
        }else
        product= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.product))));
          //
          if (!localStorage.accounts ) {
            $.getJSON( baseUrl+ "/admin/js/accounts.json", function( data ) {
              window.localStorage.accounts  = encodeURIComponent(JSON.stringify(data));
              accounts= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.accounts))));
            });
          }else
          accounts= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.accounts))));
         //
         if (!localStorage.company ) {
          $.getJSON( baseUrl+ "/admin/js/company.json", function( data ) {
            window.localStorage.company  = encodeURIComponent(JSON.stringify(data));
            company= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.company))));
          });
        }else
        accounts= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.accounts))));
         //
         if (!localStorage.company ) {
          $.getJSON( baseUrl+ "/admin/js/company.json", function( data ) {
            window.localStorage.company  = encodeURIComponent(JSON.stringify(data));
            company= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.company))));
          });
        }else
        company= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.company))));
        //
        if (!localStorage.don_hang ) {
          $.getJSON( baseUrl+ "/admin/js/don_hang.json", function( data ) {
            window.localStorage.don_hang  = encodeURIComponent(JSON.stringify(data));
            don_hang= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.don_hang))));
          });
        }else
        don_hang= JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.don_hang))));


        var login = false;
        if(localStorage.login){
         login= localStorage.login;
       } 
       var loginUser =  {
         login :   false,
         ma_khach_hang :  null,
         userName :  "",
         cart:[],
         count : 0

       }
       if(localStorage.loginUser){
        loginUser = JSON.parse(JSON.parse(JSON.stringify(decodeURIComponent(window.localStorage.loginUser))));
      }

      function logout(){
       localStorage.login  = false;
       window.location = "admin.html";
     }
     function logoutUser(){
localStorage.loginUser = encodeURIComponent(JSON.stringify({
         login :   false,
         ma_khach_hang :  null,
         userName :  "",
         cart:[],
         count : 0

       }));
       $(".social").html(" <a href=\"#\"><span class=\"fa fa-facebook\"></span></a><a href=\"#\" ><span class=\"fa fa-user\"></span></a>");
       $(".social-2").html("<a href=\"login-user.html\"><span>Đăng nhập</span></a><a href=\"sign-up.html\"><span>Đăng ký</span>");

     }


     function addToCart(ma_san_pham , sl){
       var x  ;
       for (var i = 0; i < product.length; i++) {
        if(product[i]["ma_san_pham"] == ma_san_pham){
          x = false;
          for(var j = 0; j< loginUser.cart.length; j++){
            if(product[i].ma_san_pham == loginUser.cart[j].ma_san_pham){
              loginUser.cart[j].count = parseInt(loginUser.cart[j].count)+parseInt(sl);
              x = true;                }
            }
            if(!x){
              loginUser.cart.push(
              {
                "ma_san_pham": ma_san_pham,
                "ten_san_pham": product[i].productName,
                "price": product[i].price,
                "count": sl,
                "sale": product[i].sale,
                "image" :  product[i].image
              });
            }
            countCart();
          }
        }

      }

      function countCart(){
        var x  = 0;
        for (var i = 0; i < loginUser.cart.length; i++) {
          x+= parseInt(loginUser.cart[i]['count']);
        };
        loginUser.count  = x;

        localStorage.loginUser = encodeURIComponent(JSON.stringify(loginUser));
        $(".cart-items").html("<span class='cart-count'>"+loginUser.count+"</span>");

      }
      Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
      };


      function display_user_login(){
       if( loginUser.login){
        $(".social").html(" <a href=\"#\">Chào bạn!" + loginUser.userName+"</a>");
        $(".social-2").html("<a href=\"\" onclick='logoutUser()'>Thoát</a>");

      }
    }

    function them_don_hang(ngay_hoa_don,ma_khach_hang,tri_gia,hinh_thuc_thanh_toan,ghi_chu,trang_thai){
     var max  =  0;
     for (var i = 0; i < don_hang.length; i++) {
       if(max <  don_hang[i].ma_don_hang){
        max = don_hang[i].ma_don_hang;
      }
    };
    max = parseInt(max) +1;
    don_hang.push({
      "ma_don_hang": max+"",
      "ngay_hoa_don": ngay_hoa_don,
      "ma_khach_hang": ma_khach_hang,
      "Tri_gia":tri_gia+"",
      "hinh_thuc_thanh_toan":hinh_thuc_thanh_toan,
      "ghi_chu": ghi_chu,
      "trang_thai":trang_thai+""
    });
      window.localStorage.don_hang  = encodeURIComponent(JSON.stringify(don_hang));
     return  max;

  }
   function them_ct_don_hang(ma_don_hang,ma_san_pham,so_luong,don_gia){
      ct_don_hang.push({"ma_don_hang" : ma_don_hang+"",
  "ma_san_pham" : ma_san_pham,
  "so_luong" : so_luong+"",
  "don_gia" : don_gia
});

       window.localStorage.ct_don_hang  = encodeURIComponent(JSON.stringify(ct_don_hang));


   }
  function dat_hang(){
    if(loginUser.login){
       var time = new Date();
abc=time.toLocaleDateString().split('/');
var ngay_hoa_don = abc[0]+"/"+abc[1]+"/"+abc[2];
var tri_gia = 0;
 for (var i = 0; i < loginUser.cart.length; i++) {
   tri_gia  += (loginUser.cart[i].count *  loginUser.cart[i].price)
 };
 var hinh_thuc_thanh_toan  =    $("#payment").val();
 var ma_don_hang  =  them_don_hang(ngay_hoa_don,loginUser.ma_khach_hang ,tri_gia,hinh_thuc_thanh_toan,"",0);
 for (var i = 0; i < loginUser.cart.length; i++) {
   them_ct_don_hang(ma_don_hang,loginUser.ma_khach_hang ,loginUser.cart[i].count,loginUser.cart[i].price);
 };
 alert("Đặt hàng thành công! Bạn sẽ nhận được cuộc gọi từ nhân viên của chúng tôi!");
   loginUser.cart = [];
    window.localStorage.loginUser =   encodeURIComponent(JSON.stringify(loginUser));
     window.location = ".";
    }else{
       alert("Bạn cần đăng nhập để thực hiện chức năng này!");
      window.location="login-user.html";
    }
  }

  $(function(){
    w3IncludeHTML();
    countCart();
    display_user_login();
  });