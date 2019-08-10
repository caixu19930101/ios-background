var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

//read data
router.get('/read', function(req, res, next) {
    var type = req.param('type') || '';
    fs.readFile(PATH + type + '.json', function (err, data) {
        if(err){
            return res.send({
                status:0,
                info:'Can not read file'
            });
        }
        const COUNT = 50;
        var obj = JSON.parse(data.toString());
        if (obj.length > COUNT){
            obj = obj.slice(0, COUNT);
        }
        return res.send({
            status:1,
            data:obj
        });
    })
});

//data store
router.post('/write', function(req, res, next) {
    var type = req.param('type') || '';
    var title = req.param('title') || '';
    var content = req.param('content') || '';
    if (!type || !title || !content) {
        return res.send({
            status: 0,
            info: 'content not right'
        });
    }
    //read file
    var filePath = PATH + type + '.json';
    fs.readFile(filePath, function(err, data){
        if(err){
            return res.send({
                status:0,
                info: 'read fault'
            });
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            title: title,
            content: content,
            id: guidGenerate(),
            time: new Date()
        };
        arr.splice(0, 0, obj);
        //write file
        var newData = JSON.stringify(arr);
        fs.writeFile(filePath, newData, function(err){
            if(err){
                return res.send({
                    status:0,
                    info: 'write default'
                });
            }
            return res.send({
                status:1,
                info: obj
            });
        });
    });
});

//back write data
router.post('/write_config', function(req, res, next){

    var data = req.body.data;
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    //write
    fs.writeFile(PATH + 'config.json', newData, function(err){
        if(err){
            return res.send({
                status: 0,
                info: 'write fault'
            });
        }
        return res.send({
            status: 1,
            info: obj
        });
    });
});
//guid
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}
module.exports = router;
