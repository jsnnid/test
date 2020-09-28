const fs = require("fs");
const pool = require('./bin/mysql2_local');



main(0);
function main(min_id) {
    let limit = 1000;
    pool.query("select id,title,page_keywords as keywords,page_description as description,content from m_data_source where status=1 and id>? order by id asc limit 0,?", [min_id, limit], function (error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }

        if (results.length > 0) {
            results.forEach(article => {
                // fs.writeFile(`./source/${article.id}.json`, JSON.stringify(article), function (error) {
                //     if (error) {
                //         console.log(error);
                //         return;
                //     }
                //     console.log(article.id, article.title);
                // });

                fs.writeFileSync(`./source/${article.id}.json`, JSON.stringify(article));
                console.log(article.id, article.title);

            });

            main(results[results.length - 1].id);
        }
    })
}