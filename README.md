# ProvinceCityInChina
Geting and formatting chinese provinces and cities

## 一个小功能，用来获取中国的省和市



## Installation

    npm install provincecityinchina 

## Usage

    var pc = require('provincecityinchina');
    
## Methonds

 - save
 - getAll
 - getProvinceName
 - getCityNameByProvince
    

## Specific

#### save(path[,hint])
specific the file saved path,choose if you don't need hint 
输入具体的保存文件路径，可选的打开提示或关闭提示

    pc.save('./data.json');
or

    pc.save('./data.json',false);

**save method will create a data file as your specific path,please execute the save method first~**

#### getAll(path)
get all data from saved data file
从数据文件中获取所有信息

    pc.getAll('data.json');

#### getProvinceName(path)
get province name from saved data file
从数据文件中获取中国的34个省、市、直辖市、特别行政区

    pc.getProvinceName('data.json');

#### getCityNameByProvince(path,index)
get city name by province index from saved data file,this is province map:
从数据文件中获取具体的某个省、市、直辖市、特别行政区的市或县，通过如下编号获取：

    pc.getCityNameByProvince('data.json',1)               // get "shanghai's city"


    ['上海市','云南省','内蒙古','北京市','台湾省', 
    //  1        2       3        4       5
    //
     '吉林省','四川省','天津市','宁夏','安徽省',
    //  6        7       8       9      10
    //
     '山东省','山西省','广东省','广西','新疆',     
    //  11       12      13     14     15
    //
     '江苏省','江西省','河北省','河南省','浙江省',
    //  16      17       18      19       20 
    //
     '海南省','湖北省','湖南省','澳门特别行政区','甘肃省', 
    //  21      22       23          24          25
    //
     '福建省','西藏','贵州省','辽宁省','重庆市',             
    // 26     27     28       29       30
    //
     '陕西省','青海省','香港特别行政区','黑龙江省' ] 
    // 31      32          33           34

### 数据来自[中国地区代码表](http://www.ccb.com/cn/OtherResource/bankroll/html/code_help.html)
