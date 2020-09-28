/*
 * @Author: Yang Kun
 * @Descripttion: 
 * @Date: 2020-09-18 16:58:26
 * @LastEditors: Yang Kun
 * @LastEditTime: 2020-09-28 17:08:38
 */
const fs = require("fs");
var Bagpipe = require('bagpipe');
var bagpipe = new Bagpipe(50, {
    timeout: 30000
});


source("./source/");

function source(data_source) {
    fs.readdir(data_source, function (error, datas) {
        if (error) {
            console.error(error);
            return;
        }

        datas.forEach(path => {
            fs.stat(data_source + path + "/", function (err, stat) {
                if (err) {
                    console.error(err);
                    throw err;
                }

                if (stat.isFile()) {
                    // toHtml(data_source + path);
                    bagpipe.push(toHtml, data_source + path, function (htmlFilename) {
                        if (htmlFilename) {
                            console.log(htmlFilename);
                        }
                    });
                } else {
                    // 文件夹
                    var nextDir = (data_source + path + "/").replace('source', 'public');
                    if (fs.existsSync(nextDir)) {
                        source(data_source + path + "/");
                    } else {
                        fs.mkdir(nextDir, function (err) {
                            if (err) {
                                console.error(err);
                                throw err;
                            }

                            source(data_source + path + "/");
                        });
                    }
                }
            });
        });
    });
}

function toHtml(dataFile, callback) {
    let htmlFilename = dataFile.replace('source', 'public').replace('json', 'html');
    if (fs.existsSync(htmlFilename)) {
        callback(htmlFilename)
        return;
    }

    fs.readFile(dataFile, function (error, data) {
        if (error) {
            console.error(error);
            throw error;
        }

        let json = JSON.parse(data);

        json.theme = json.theme || 'default';
        json.view = json.view || 'text.html';

        fs.readFile(`./view/${json.theme}/${json.view}`, function (error, view) {
            if (error) {
                console.error(error);
                throw error;
            }
            let html = view.toString();
            // html = html.replace(new RegExp("<!\-\-[/w/W]*?\-\->", 'g'), '');

            for (let k in json) {
                let r = new RegExp("\{" + k + "\}", 'g');
                // console.log(r);
                html = html.replace(r, json[k]);
            }

            // 删除数据没有的字段
            html = html.replace(new RegExp("\{.*?\}", 'g'), '--');

            fs.writeFile(htmlFilename, html, function (error) {
                if (error) {
                    console.error(error);
                    throw error;
                }
                callback(htmlFilename)
            });
        });
    })
}