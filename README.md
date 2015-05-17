# ProvinceCityInChina
Geting and formatting chinese provinces and cities

##一个小功能，用来获取中国的省和市

##数据来自[中国地区代码表](http://www.ccb.com/cn/OtherResource/bankroll/html/code_help.html)

##Installation

    git clone git@github.com:qianjiahao/ProvinceCityInChina.git

##Usage

    var pc = require('./index.js');
    
##Methonds

    save()
    getAll()
    getProvinceName()
    getCityNameByProvince()
    

##Specific

###save(path[,hint])
specific the file saved path,choose if you don't need hint 

###getAll(path)
get all data from saved data file

###getProvinceName(path)
get province name from saved data file

###getCityNameByProvince(path,index)
get city name by province index from saved data file,this is province map:

    ['上海市','云南省','内蒙古','北京市','台湾省',            // 1  - 5
    '吉林省','四川省','天津市','宁夏','安徽省',               // 6  - 10
    '山东省','山西省','广东省','广西','新疆',                 // 11 - 15
    '江苏省','江西省','河北省','河南省','浙江省',             // 16 - 20
    '海南省','湖北省','湖南省','澳门特别行政区','甘肃省',     // 21 - 25
    '福建省','西藏','贵州省','辽宁省','重庆市',               // 26 - 30
    '陕西省','青海省','香港特别行政区','黑龙江省' ]           // 31 - 24   
