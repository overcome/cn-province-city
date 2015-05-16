'use strict';

var Q = require('q');
var superagent = require('superagent');
var cheerio = require('cheerio');
var fse = require('fs-extra');

/**
 * map of province
 * @type {Array}
 */
var map =['上海市','云南省','内蒙古','北京市','吉林省','四川省','天津市','宁夏','安徽省',
		  '山东省','山西省','广东省','广西','新疆','江苏省','江西省','河北省','河南省',
		  '浙江省','海南省','湖北省','湖南省','甘肃省','福建省','西藏','贵州省','辽宁省',
		  '重庆市','陕西省','青海省','黑龙江省' ]; 

/**
 * fetch data from webpage
 * @return {result} [result data]
 */
function fetch(){
	
	var url = 'http://www.ccb.com/cn/OtherResource/bankroll/html/code_help.html';
	var deferred = Q.defer();

	superagent.get(url)
		.end(function(err,data){
			if(err){
				deferred.reject(err);
				return ;
			}
			var $ = cheerio.load(data.text);
			var result = [];

			$('.addlist').each(function(index,ele){				
				$(ele).find('tr').each(function(index,tr){

					var re = /\r\n|\s+/g;
					var temp = $(tr).find('td').text().replace(re,'');

					if(temp && temp.length){
						result.push({
							province:$(ele).find('h3').text(),
							city:temp.slice(4)
						});	
					}
				});
			});
			deferred.resolve(result);
		});
	
	return deferred.promise;
}

/**
 * save data in json
 * @param  {String} path [file path]
 * @param  {All} hint [display the hint or not]
 */
module.exports.save = function(path,hint){

	fetch()
		.then(function(data){
			return JSON.stringify(data);
		})
		.then(function(json){
			fse.outputJson(path,json);
		})
		.then(function(data){
			if(hint === null || hint ===undefined ||hint === true){
				console.log('save file success. file path : ',path)
			}
		},function(err){
			if(hint === null || hint ===undefined ||hint === true){
				console.log('save file failure.')		
			}
			console.log(err);
		});
}

/**
 * get all data from json file
 * @param  {String} path [file path]
 * @return {Array}      [array of data]
 */
module.exports.getAll = function(path){
	return JSON.parse(fse.readJsonSync(path));
}

/**
 * get province name
 * @return {Array} [array of privince name]
 */
module.exports.getProvinceName = function(){
	return map;
}

/**
 * get city name by province number
 * @param  {String} path     [file path]
 * @param  {Number} province [number of province in map]
 * @return {Array}           [array of city]
 */
module.exports.getCityNameByProvince = function(path,province){
	
	var result = [];
	var data = JSON.parse(fse.readJsonSync(path));

	for(var i = 0;i<data.length;i++){
		if(data[i].province == map[province]){
			result.push(data[i].city);		
		}
	}
	return result;
}




















