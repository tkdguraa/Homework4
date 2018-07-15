
const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

app.get('/api/compute',function(req,res){
    
     
    
    if( req.get('hw-token') === '58839c3e82fb23c9d547dcca1ba878a6bc502ed0' ){
    if(req.query.type === 'DIV')  
    return res.json({ans: parseInt(Number(req.query.firstParam) / Number(req.query.secondParam))});

    else if(req.query.type === 'ADD') 
    return res.json({ans: (Number(req.query.firstParam) + Number(req.query.secondParam))}); 

    else if(req.query.type === 'SUB')
    return res.json({ans: parseInt(Number(req.query.firstParam) - Number(req.query.secondParam))}); 

    else if(req.query.type === 'MUL') 
    return res.json({ans: parseInt(Number(req.query.firstParam) * Number(req.query.secondParam))}); 
    }
    else 
    return res.status(403).send('Forbidden');;
});

let temp = new Array;

app.post('/api/pair',multipartMiddleware,function(req,res){
    
    if( req.get('hw-token') === '58839c3e82fb23c9d547dcca1ba878a6bc502ed0' ){
    if(req.body['key'][0].length === 1)
        temp = req.body;
    
    else{
    for(let i = temp.length;i < req.body['key'].length; i++){
        let cnt=0;
        if(temp.length>0)
        for(let j = 0;j < temp.length; j++){
           if(req.body['key'][i] === temp[j]['key'])
              break; 
            cnt++;
        }
        if(cnt === temp.length)
          temp[temp.length] = {key:req.body['key'][i],value:req.body['value'][i]};
        else
          temp[cnt]['value'] = req.body['value'][i];
    }}
    res.send("POST");
    }
    else 
    return res.status(403).send('Forbidden');;
    
})

app.get('/api/pair',function(req,res){
    if( req.get('hw-token') === '58839c3e82fb23c9d547dcca1ba878a6bc502ed0' ){
    if(temp === null)
    return res.status(404);
    
    if(temp['key'][0].length === 1){
        if(temp['key'] === req.query.key){
        console.log(temp['value']);
        return res.json({value: temp['value']}); 
        }
    }
    else{
    for(let i = 0 ;i < temp.length; i++){
        if(temp[i]['key'] === req.query.key){
         console.log(temp[i]['value']);
         return res.json({value: temp[i]['value']});
        }
    }}
    res.send("GeT");
    }
    else 
    {
        console.log("forbidden");
        return res.status(403).send('Forbidden');
    }
})

app.delete('/api/pair',function(req,res){


    if( req.get('hw-token') === '58839c3e82fb23c9d547dcca1ba878a6bc502ed0' ){
    let cnt = 0;
    if(temp['key'][0].length === 1){
        if(temp['key'] === req.query.key){
            temp=null;
            return res.send('DELETE');
        }
        else  return res.status(404);
        
    }
    else{
    for(let i = 0 ;i < temp.length; i++){
        cnt++;
        if(temp[i]['key'] === req.query.key){
         temp.splice(i,i);
         res.send("DELETE");
         console.log(temp);
         return;
        }
    }}
    return res.status(404);
    }
    else return res.status(403).send('Forbidden');;
})


app.listen(3000,function(){
    console.log('The server ins running now');
});
