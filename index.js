
'use strict';

var Q = require('q');
var superagent = require('superagent');
var cheerio = require('cheerio');
var fse = require('fs-extra');
var pkg = require('./package.json');

if(process.argv[2] === '-s' || process.argv[2] === '--save'){
	save(process.argv[3]);
}

if(process.argv[2] === '-h' || process.argv[2] === '--help'){
	console.log(' ')
	console.log('  version : ',pkg.version);
	console.log(' ');
	console.log('  command : ');
	console.log(' ');
	console.log('	npm run save [path]','	save data into file');
	console.log('	npm run help       ','	ask for help');
	console.log(' ')
}
/**
 * cache of provinces name
 * @type {Array}
 */
var cache = [];
/**
 * fetch data from webpage
 * @return {result} [result data]
 */
function fetch(){
	
	var url = 'http://www.ccb.com/cn/OtherResource/bankroll/html/code_help.html';
	var deferred = Q.defer();
	var taiwan = '台湾省';
	var taiwanCity = ['新北市','台北市','台中市','台南市','高雄市','基隆市','嘉义市','屏东市',
					  '台北县板桥市','三重市','中和市','永和市','新庄市','新店市','土城市',
					  '芦洲市','树林市','汐止市','台中县丰原市','大里市','太平市','台南县新营市',
					  '永康市','高雄县凤山市'];
	var xianggang = '香港特别行政区';
	var xianggangCity = ['中西区','东区','南区','湾仔区','九龙城区','观塘区','深水埗区',
						 '黄大仙区','油尖旺区','离岛区','葵青区','北区','西贡区','沙田区',
						 '大埔区','荃湾区','屯门区','元朗区'];
	var aomen = '澳门特别行政区';
	var aomenCity = '澳门市';
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

			for(var i = 0;i<taiwanCity.length;i++){
				result.push({
					province:taiwan,
					city:taiwanCity[i]
				});
			}

			for(var i = 0;i<xianggangCity.length;i++){
				result.push({
					province:xianggang,
					city:xianggangCity[i]
				});
			}
			result.push({
				province:aomen,
				city:aomenCity
			});
			deferred.resolve(result);
		});
	
	return deferred.promise;
}

/**
 * save data in json
 * @param  {String} path [file path]
 */
function save(path){
	if(!path){
		console.log('specific file path !');
	}else{
		fetch()
		.then(function(data){
			return JSON.stringify(data);
		})
		.then(function(json){
			fse.outputJson(path,json);
		})
		.then(function(data){
				console.log('save file success. file path : ',path)
		},function(err){
				console.log('save file failure.')		
			console.log(err);
		});
	}
};

/**
 * get all data from json file
 * @param  {String} path [file path]
 * @return {Array}      [array of data]
 */
module.exports.getAll = function(path){
	return JSON.parse(fse.readJsonSync(path));
};

/**
 * get province name
 * @param  {String} path [file path]
 * @return {Array} [array of privince name]
 */
module.exports.getProvince = function(path){

	if(cache && cache.length){    				
		return cache;
	}else{										
		var data = JSON.parse(fse.readJsonSync(path));
		cache.push(data[0].province);

		for(var i = 0;i<data.length-1;i++){
			if(data[i].province !== data[i+1].province){
				cache.push(data[i+1].province);
			}
		}
		cache = cache.sort();
		return cache;
	}
	
};

/**
 * get city name by province number
 * @param  {String} path     [file path]
 * @param  {Number} number   [number of province in map]
 * @return {Array}           [array of city]
 */
module.exports.getCity = function(path,index){
	
	var data = JSON.parse(fse.readJsonSync(path));
	var result = [];
	var index = index - 1;
	if(cache && cache.length){                  
		for(var i = 0;i<data.length;i++){
			if(data[i].province == cache[index]){
				result.push(data[i].city);		
			}
		}
		return result;
	}else{         								
		if(result){
			for(var i = 0;i<data.length-1;i++){
				if(data[i].province !== data[i+1].province){
					result.push(data[i+1].province);
				}
			}
		}else{
			result.push(data[0].province);
		}
		cache = result.sort();
		result = [];
		for(var i = 0;i<data.length;i++){
			if(data[i].province == cache[index]){
				result.push(data[i].city);		
			}
		}
		return result;
	}
};

















