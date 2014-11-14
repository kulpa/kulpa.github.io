var SCREEN_SIZE = 500;                    // キャンバスの幅
var SIDE_CELLS = 50;                     // 一辺のセルの数
var CELL_SIZE = SCREEN_SIZE / SIDE_CELLS; // セルの幅
var FPS = 0.5;                             // フレームレート
var canvas;                     //= document.getElementById('world');
var context;                    //= canvas.getContext('2d');
var number_of_server = 3;           //サーバー数
var arriving_rate = 46;              //到着率
var management = 12;                 //処理能力
var field = 0;                      //その時々のいる人数の状態を格納
var count = 0;

function onButtonClick(){
    number_of_server = document.form.number_of_server.value;
    arriving_rate = document.form.arriving_rate.value;
    management = document.form.management.value;
    //alert(number_of_server);
    //location.href = "http://www9.plala.or.jp/oyoyon/html/script/href.html";
    update(field);
}


window.onload = function(){
    canvas = document.getElementById('world'); // canvas要素を取得
    canvas.width = canvas.height = SCREEN_SIZE; // キャンバスのサイズを設定
    var scaleRate = Math.min(window.innerHeight/SCREEN_SIZE, window.innerHeight/SCREEN_SIZE); // Canvas引き伸ばし率の取得
    canvas.style.width = canvas.style.height = SCREEN_SIZE*scaleRate+'px';  // キャンバスを引き伸ばし
    context = canvas.getContext('2d');                // コンテキスト
    context.fillStyle = 'rgb(211, 85, 149)';          // 色
    //update(field);   // ゲームループ開始
}


function update(field){
    //alert(number_of_server);
    var new_coming = -(arriving_rate)*Math.log(Math.random());　//単位時間に新たに来る人
    var per_manage_number = -(management)*Math.log(Math.random()); //単位時間に一つのサーバで処理できる人数
    field = field + new_coming - (number_of_server * per_manage_number); //fieldの更新
    if(field<0){
        field = 0;
    }
    draw(field);
    setTimeout(update, 1000/FPS, field);
}

function draw(field){
    //alert(number_of_server);
    console.log("サーバーの数は" + number_of_server);
    console.log("到着率は" + arriving_rate);
    console.log("処理能力は" + management);
    console.log(SCREEN_SIZE);
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE); // 画面をクリア
    if(field==0){
        
    }else if(field<=number_of_server){
        for (var i=1;i<=field;i++){
            context.fillRect(0,(SCREEN_SIZE/(number_of_server+1))*i,CELL_SIZE,CELL_SIZE);
            context.strokeRect(0,(SCREEN_SIZE/(number_of_server+1))*i,CELL_SIZE,CELL_SIZE);
        }
    }else{
        for (var i=1;i<=number_of_server;i++){
            context.fillRect(0,(SCREEN_SIZE/(number_of_server+1))*i,CELL_SIZE,CELL_SIZE);
            context.strokeRect(0,(SCREEN_SIZE/(number_of_server+1))*i,CELL_SIZE,CELL_SIZE);
        }//処理中の人を描画
        for(var j=0;j<Math.ceil((field - number_of_server)/SIDE_CELLS);j++){
            for(var i=0;i<(field - number_of_server);i++){
                context.fillRect(SCREEN_SIZE - CELL_SIZE - j*CELL_SIZE,i*CELL_SIZE,CELL_SIZE,CELL_SIZE);
                context.strokeRect(SCREEN_SIZE - CELL_SIZE - j*CELL_SIZE,i*CELL_SIZE,CELL_SIZE,CELL_SIZE);
            }
        }
    }
}

