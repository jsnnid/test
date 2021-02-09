var fs = require("fs");

var gitignore_txt = fs.readFileSync('.gitignore').toString()

var gitignore = gitignore_txt.split("\n");
var dict_path = "D:/0/jsnnid.github.io";

var notImg = [];
var img = [];
var imgDirFileSite = {};

gitignore.forEach(element => {
    if (element.indexOf("/wp-content/") > -1) {
        img.push(element);
    } else {
        notImg.push(element);
    }
});


var notImg_text = notImg.join("\n") + "\n";


img.forEach(element => {
    imgDirFileSite[element] = dirFileSize(element.slice(0, -1));
});


main();
function main() {
    let fileN = 0;
    for (let u in imgDirFileSite) {
        // console.log(u, imgDirFileSite[u]);

        gitignore_txt = gitignore_txt.replace(imgDirFileSite[u] + "\n", "");

        fileN += imgDirFileSite[u];

        if (fileN > 600) {
            break;
        }
    }


    fs.writeFileSync('.gitignore', gitignore_txt);


    
}




// 获取文件夹下总共文件数量
function dirFileSize(path) {
    let thisDirFile = fs.readdirSync(dict_path + path);
    return thisDirFile.length;
}