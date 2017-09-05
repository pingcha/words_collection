// 引入fs模块
var fs = require('fs');

// 引入file json库
var jsonfile = require('jsonfile');

// 定义要扫描的目标文件夹
var readDirPath = '../words-from-the-heart/';

// 定义要存放所有心里话的json文件
var writeFilePath = './all_words.json';

// 定义用于存放格式不正确的json文件名的 json文件
var errorFilePath = './error_data.json';

// 调用fs的readdir函数读取所有文件
fs.readdir(readDirPath, function(err, files) {
    // 如果扫描有错误，打印错误，运行结束
    if (err) {
        console.log("scanning failed")
        return;
    }

    // 提示扫描成功
    console.log("scanning successfully");

    // 如果扫描文件中无文件，打印无文件，运行结束
    if (files.length === 0) {
        console.log("file does not exist")
        return;
    }

    // 过滤出以 .json 结尾的json文件，并把数据存在 jsonFilesList 数组中（需要一一判断——要用到循环语句for））
    var jsonFilesList = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i].slice(-5) === '.json') {
            jsonFilesList.push(files[i]);
        }
    }

    var jsonList = [];
    var errorFiles = [];
    // 循环读取json文件的内容
    for (var i = 0; i < jsonFilesList.length; i++) {
        // 同步读取文件如果发生错误，用try...catch捕获该错误
        try {
            // 读取json文件内容（文件路径+文件名）,并存在jsonList数组内
            var contentJson = jsonfile.readFileSync(readDirPath + jsonFilesList[i]);
            jsonList.push(contentJson);
        }   catch (err) {
            // 如果读取错误就把错误的文件名写入到errorFiles数组内
            errorFiles.push(jsonFilesList[i]);
        }
    }

    // 将收集到的 jsonList 写入到一个json文件中
    jsonfile.writeFileSync(writeFilePath, jsonList);

    // 将收集到的错误文件的文件名写入到一个json文件中
    jsonfile.writeFileSync(errorFilePath, errorFiles);
    
});