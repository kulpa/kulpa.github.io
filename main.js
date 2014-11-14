var SCREEN_SIZE = 500.0;                    // キャンバスの幅
var SIDE_CELLS = 50.0;                     // 一辺のセルの数
var CELL_SIZE = SCREEN_SIZE / SIDE_CELLS; // セルの幅
var FPS = 0.5;                             // フレームレート
var canvas;                     //= document.getElementById('world');
var context;                    //= canvas.getContext('2d');
var number_of_server = 3.0;           //サーバー数
var arriving_rate = 46.0;              //到着率
var management = 12.0;                 //処理能力
var field;                      //その時々のいる人数の状態を格納

function onButtonClick(){
    number_of_server = document.form.number_of_server.value;
    alert(document.form.number_of_server.value)
    arriving_rate = document.form.arriving_rate.value;
    management = document.form.management.value;
    //$.cookie("field") = $.cookie("field");
    //alert(number_of_server);
    clearTimeout(default_action);
    update($.cookie("field"));
}


window.onload = function(){
    field = 0;
    $.cookie("field",field);
    canvas = document.getElementById('world'); // canvas要素を取得
    canvas.width = canvas.height = SCREEN_SIZE; // キャンバスのサイズを設定
    var scaleRate = Math.min(window.innerHeight/SCREEN_SIZE, window.innerHeight/SCREEN_SIZE); // Canvas引き伸ばし率の取得
    canvas.style.width = canvas.style.height = SCREEN_SIZE*scaleRate+'px';  // キャンバスを引き伸ばし
    context = canvas.getContext('2d');                // コンテキスト
    context.fillStyle = 'rgb(211, 85, 149)';          // 色
    update();   // ゲームループ開始
}


function update(){
    //alert(number_of_server);
    console.log(typeof($.cookie("field")));
    console.log(typeof(number_of_server));
    field = $.cookie("field");
    var new_coming = -(arriving_rate)*Math.log(Math.random());　//単位時間に新たに来る人
    var per_manage_number = -(management)*Math.log(Math.random()); //単位時間に一つのサーバで処理できる人数
    field = parseFloat(field) + new_coming - (number_of_server * per_manage_number);
    //console.log(field);
    $.removeCookie("field");
    $.cookie("field",field); //$.cookie("field")の更新
    if($.cookie("field")<=0){
        $.cookie("field",0);
    }
    draw();
    default_action = setTimeout(update, 1000/FPS);
}

function draw(){
    //alert(number_of_server);
    //console.log("サーバーの数は" + number_of_server);
    //console.log("到着率は" + arriving_rate);
    //console.log("処理能力は" + management);
    //console.log(SCREEN_SIZE);
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE); // 画面をクリア
    if($.cookie("field")==0){
        
    }else if($.cookie("field")<=number_of_server){
        for (var i=1;i<=$.cookie("field");i++){
            context.fillRect(0,(SCREEN_SIZE/(number_of_server+1.0))*i,CELL_SIZE,CELL_SIZE);
            context.strokeRect(0,(SCREEN_SIZE/(number_of_server+1.0))*i,CELL_SIZE,CELL_SIZE);
        }
        
    }else{
        for (var i=1;i<=number_of_server;i++){
            //context.fillRect(0,(SCREEN_SIZE/(number_of_server+1.0))*i,CELL_SIZE,CELL_SIZE);
            //context.strokeRect(0,(SCREEN_SIZE/(number_of_server+1.0))*i,CELL_SIZE,CELL_SIZE);
            //console.log(SCREEN_SIZE/(number_of_server));//正しい結果
            //console.log(SCREEN_SIZE/(number_of_server+1.0));//変わっちゃう
        }//処理中の人を描画
        /**
        for(var j=0;j<Math.ceil(($.cookie("field") - number_of_server)/SIDE_CELLS);j++){
            for(var i=0;i<($.cookie("field") - number_of_server);i++){
                context.fillRect(SCREEN_SIZE - CELL_SIZE - j*CELL_SIZE,i*CELL_SIZE,CELL_SIZE,CELL_SIZE);
                context.strokeRect(SCREEN_SIZE - CELL_SIZE - j*CELL_SIZE,i*CELL_SIZE,CELL_SIZE,CELL_SIZE);
            }
        }**/
        
    }
}

