var SCREEN_SIZE = 500;                    // キャンバスの幅
var SIDE_CELLS = 100;                     // 一辺のセルの数
var CELL_SIZE = SCREEN_SIZE / SIDE_CELLS; // セルの幅
var FPS = 10;                             // フレームレート
var canvas;                     //= document.getElementById('world');
var context;                    //= canvas.getContext('2d');
var number_of_server = 3;           //サーバー数
var arriving_rate = 36;              //到着率
var management = 16;                 //処理能力
var field = 0;                      //その時々のいる人数の状態を格納

window.onload = function() {
    canvas = document.getElementById('world'); // canvas要素を取得
    canvas.width = canvas.height = SCREEN_SIZE; // キャンバスのサイズを設定
    var scaleRate = Math.min(window.innerHeight/SCREEN_SIZE, window.innerHeight/SCREEN_SIZE); // Canvas引き伸ばし率の取得
    canvas.style.width = canvas.style.height = SCREEN_SIZE*scaleRate+'px';  // キャンバスを引き伸ばし
    context = canvas.getContext('2d');                // コンテキスト
    context.fillStyle = 'rgb(211, 85, 149)';          // 色
    update(field);   // ゲームループ開始
}

function update(field){
    var new_coming = -(arriving_rate)*Math.log(Math.random());　//単位時間に新たに来る人
    var per_manage_number = -(management)*Math.log(Math.random()); //単位時間に一つのサーバで処理できる人数
    field = field + new_coming - (number_of_server * per_manage_number); //fieldの更新
    if(field<0){
        field = 0;
    }
    draw(field,number_of_server);
    setTimeout(update, 1000/FPS, field);
}

function draw(field,number_of_server){
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE); // 画面をクリア
    if(field==0){
        
    }else if(field<=number_of_server){
        for (var i=0;i<field;i++){
            context.fillRect(0,(SCREEN_SIZE/number_of_server)*i,CELL_SIZE,CELL_SIZE);
        }
    }else{
        for (var i=0;i<number_of_server;i++){
            context.fillRect(0,(SCREEN_SIZE/number_of_server)*i,CELL_SIZE,CELL_SIZE);
        }//処理中の人を描画
        for(var j=0;j<Math.ceil((field - number_of_server)/SIDE_CELLS);j++){
            for(var i=0;i<(field - number_of_server);i++){
                context.fillRect(SCREEN_SIZE - CELL_SIZE - j*CELL_SIZE,i*CELL_SIZE,CELL_SIZE,CELL_SIZE);
            }
        }
    }
}
