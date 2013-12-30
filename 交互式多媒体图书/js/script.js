// JavaScript Document
window.onload=function ()
{
	var gui = require('nw.gui');
  var win = gui.Window.get();
  win.maximize();

	var oDiv=document.getElementById('div1');
	var oUl=document.getElementById('ul1');
	var aLi=oUl.getElementsByTagName('li');
	var i=0;
	var iNow=0;
	var aA=oDiv.getElementsByTagName('a');
	var ready=true;
	var wait=0;
	var db;//数据库
	var num=0;//增加/删除图书时的选择顺序
	var tag=0;//在哪个页面
	var lr=0;
	var index=0;
	if(window.openDatabase==undefined){
		      alert("浏览器不支持web Database");
			  return;
		   }
    db=window.openDatabase("baseBook","1.0","sample",1024*1024); 
    if(!db)alert("Failed to connect to database."); 
	db.transaction(function(tx){
		    tx.executeSql('CREATE TABLE if not exists book7 (bookno unique,bookname,isshow)');
            tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (1, "help","true false")');
            tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (2, "WINTER","true")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (3, "Las Vegas","true")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (4, "kong zi","true")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (5, "bei ke han mu","true")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (6, "zhang xi","true")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (7, "feng xiao gang","true")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (8, "史玉柱","false")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (9, "任志强","false")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (10, "毛泽东","false")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (11, "大熊猫","false")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (12, "发现你自己","false")');
			tx.executeSql('INSERT INTO book7 (bookno,bookname,isshow) VALUES (13, "逃出山洞","false")');
		  });
    
	 
	//初始化书架
	var test= document.createElement("li");
	test.setAttribute("class", "cur");
	test.setAttribute("id","help" );
	test.innerHTML='<img src="images/1.jpg"/>';
	oUl.insertBefore(test,oUl.childNodes[0]); 
	
	db.transaction(function(tx){
		    tx.executeSql("select * from book7 where isshow='true' ",[],function(tx,rs){
				for(var i=0;i<rs.rows.length;i++){
				   var row =rs.rows.item(i);
				   var test= document.createElement("li");
	               test.setAttribute("class", "cur left left2 right right2");
				   var src="images/"+row.bookno+".jpg"	
				   var source=row.bookname+".html"
				   test.setAttribute("id",row.bookname );
	               test.innerHTML="<img src = \"" + src + "\"/>"
	               oUl.insertBefore(test,oUl.childNodes[i]); 
				    }
				});				
	        });
			
	
	db.transaction(function(tx){
		    tx.executeSql("select * from book7 where isshow='true' ",[],function(tx,rs){
				for(var i=0;i<rs.rows.length;i++){
				   var row =rs.rows.item(i);
				   //添加一行
				   var testTbl=document.getElementById('tableIdOne')
                   var newTr = testTbl.insertRow(i);
                  //添加两列
                  var newTd0 = newTr.insertCell();
                  var newTd1 = newTr.insertCell();
				  var newTd2= newTr.insertCell();
				  if(i==0){newTr.setAttribute("style","background-color:#6699FF");}
                  //设置列内容和属性
                   newTd2.innerHTML = row.bookno; 
                   newTd1.innerText= row.bookname;
				   newTd0.innerHTML = '<input type=checkbox>';
				   
				    }
				});
				tx.executeSql("select * from book7 where isshow='false' ",[],function(tx,rs){
				for(var i=0;i<rs.rows.length;i++){
				   var row =rs.rows.item(i);
				   //添加一行
				   var testTb2=document.getElementById('tableIdTwo')
                   var newTr = testTb2.insertRow(i);
                  //添加两列
                  var newTd0 = newTr.insertCell();
                  var newTd1 = newTr.insertCell();
				  var newTd2= newTr.insertCell();
				  if(i==0){newTr.setAttribute("style","background-color:#6699FF");}
                  //设置列内容和属性
                   newTd2.innerHTML = row.bookno; 
                   newTd1.innerText= row.bookname;
				   newTd0.innerHTML = '<input type=checkbox>';
				    }
				});
	        });
			// 变换颜色
    function setcolor(resetid, setid){
	if(tag==1){
	var testTbl=document.getElementById('tableIdOne');
	var aa=testTbl.getElementsByTagName("tr");
	aa[resetid%aa.length].style.backgroundColor="#FFFFFF";
	aa[setid%aa.length].style.backgroundColor="#6699FF";
	} 
    else if(tag==2){
	var testTbl=document.getElementById('tableIdTwo');
	var aa=testTbl.getElementsByTagName("tr");
	aa[resetid%aa.length].style.backgroundColor="#FFFFFF";
	aa[setid%aa.length].style.backgroundColor="#6699FF";	
	}
    }
	 function txtFocusOne() {
       var e = window.event;
       var obj = e.srcElement;   //当前对象
       obj.style.background = "#9400D3"
    } 
	function txtFocusTwo() {
       var e = window.event;
       var obj = e.srcElement;   //当前对象
       obj.style.background = "#9400D3"
    } 
	function txtFocusThree() {
       var e = window.event;
       var obj = e.srcElement;   //当前对象
       obj.style.background = "#9400D3"
    } 
        function txtBlur() {
       var e = window.event;
       var obj = e.srcElement;   //当前对象
       obj.style.background = "#5395cd";
	   aLi[iNow].focus();

    }  	
	
	 document.getElementById("buttonOne").onfocus=function(){txtFocusOne()};
	  document.getElementById("buttonOne").onblur=function(){txtBlur()};
	 document.getElementById("buttonOne").onclick=function(){deleteButton()};
	 function deleteButton()
	 {
	  tag=1;index=1;
	 }
	 document.getElementById("buttonTwo").onclick=function(){insertButton()};
	 document.getElementById("buttonTwo").onfocus=function(){txtFocusTwo()};
	  document.getElementById("buttonTwo").onblur=function(){txtBlur()};
	  document.getElementById("buttonThree").onclick=function(){openBook()};
	 document.getElementById("buttonThree").onfocus=function(){txtFocusThree()};
	  document.getElementById("buttonThree").onblur=function(){txtBlur()};
	   var button=document.getElementById("buttonThree");
	 button.focus();
	 function openBook()
	 {
	  window.location=aLi[iNow].id+".html";
	 }
	 function insertButton()
	 {
	  tag=2;index=1;
	 }
	 document.getElementById("primaryOne").onclick=function(){deleteBook()};		   
	 function deleteBook()
     {
	 var testTbl=document.getElementById('tableIdOne');
	 var aa=testTbl.getElementsByTagName("input");
	 db.transaction(function(tx){
     for(var j=aa.length-1; j>=0; j--){

     if (aa[j].checked==true){
	 	 
	     var  m=document.getElementById('tableIdOne').rows.item(j).cells.item(0).innerHTML;		 
		 
		 tx.executeSql("update book7 set isshow = 'false' where bookno= " +parseInt(m));
		 
		 document.getElementById('tableIdOne').deleteRow(j); 
		 //alert("我是"+parseInt(m));
                 };
				 }
				 });
     $('#myModalOne').modal('hide');
	 tag=0;lr=0;

	 location.reload();
     };

	 document.getElementById("primaryTwo").onclick=function(){insertBook()};		   
	 function insertBook()
     {	
     var testTb2=document.getElementById('tableIdTwo');
	 var aa=testTb2.getElementsByTagName("input");
	  db.transaction(function(tx){
     for(var j=aa.length-1; j>=0; j--){
     if (aa[j].checked==true){
	      var  m=document.getElementById('tableIdTwo').rows.item(j).cells.item(0).innerHTML;	
            
		
		 tx.executeSql("update book7 set isshow = 'true' where bookno= " +parseInt(m)+"");
		
		 document.getElementById('tableIdTwo').deleteRow(j); 

                 };
				 }	
	 		  });
     $('#myModalTwo').modal('hide');
	  tag=0;lr=0;
	 		 location.reload();
     };
	document.getElementById("CloseOne").onclick=function(){$('#myModalOne').modal('hide');tag=0;lr=0;index=0;};
    document.getElementById("CloseTwo").onclick=function(){$('#myModalTwo').modal('hide');tag=0;lr=0;index=0;};

	
	aA[0].onclick=function ()
	{
		tab((iNow-1+aLi.length)%aLi.length);
	};
	
	aA[1].onclick=function ()
	{
		tab((iNow+1)%aLi.length);
	};
	
	var arr=[{b: 'webkit', e: 'webkitTransitionEnd'}, {b: 'firefox', e: 'transitionend'}];
	
	function tEnd(ev){
		var obj=ev.srcElement||ev.target;
		if(obj.tagName!='LI')return;
		wait--;
		if(wait<=0)ready=true;
	}
	
	for(var i=0;i<arr.length;i++)
	{
		if(navigator.userAgent.toLowerCase().search(arr[i].b)!=-1)
		{
			document.addEventListener(arr[i].e, tEnd, false);
			break;
		}
	}
	
	function m(n){return (n+aLi.length)%aLi.length;}
	
	function tab(now)
	{
		if(!ready)return;
		ready=false;
		
		iNow=now;
		
		wait=aLi.length;
		
		for(var i=0;i<aLi.length;i++)
		{
			aLi[i].className='';
			aLi[i].onclick=null;
		}
		aLi[m(iNow-2)].className='left2';
		aLi[m(iNow-1)].className='left';
		aLi[iNow].className='cur';
		aLi[m(iNow+1)].className='right';
		aLi[m(iNow+2)].className='right2';
		
		setEv();
	}
	
	//setEv();
	
	function setEv()
	{
		var scaled=false;
		aLi[m(iNow-1)].onclick=aA[0].onclick;
		aLi[iNow].onclick=function ()	//放大
		{
			if(scaled)
			{
				this.className='active';
			}
			else
			{
				this.className='cur';
			}
			scaled=!scaled;
		setTimeout(function(){window.location=aLi[iNow].id+".html";},3000)
		};
		aLi[m(iNow+1)].onclick=aA[1].onclick;
	}
	//aLi[aLi.length].onclick=function (){
	//setTimeout(function(){window.location="help.html";},3000)}
	document.onkeydown=function (ev)
	{
		var oEvent=ev||event;
		
		switch(oEvent.keyCode)
		{
			case 27: 
                  var button=document.getElementById("buttonThree");
	              button.focus();
				  break;
		    case 13:  //Enter键
			    if(tag==1){
	            var testTbl=document.getElementById('tableIdOne');
	            var aa=testTbl.getElementsByTagName("input")
				if(aa[num%aa.length].checked==false){
				aa[num%aa.length].checked=true;}
	            else{
				aa[num%aa.length].checked=false;}            
	           } 
                else if(tag==2){
	            var testTbl=document.getElementById('tableIdTwo');
	            var aa=testTbl.getElementsByTagName("input");
	           if(aa[num%aa.length].checked==false){
				aa[num%aa.length].checked=true;}
	            else{
				aa[num%aa.length].checked=false;} 	
	           }
			   
			   break;
			case 37:	//←
			
			if(tag==1){
			    if(lr==0||lr==1){document.getElementById("primaryOne").focus();lr=2;}
				else if(lr==2){document.getElementById("CloseOne").focus();lr=1;}
			}
			else if(tag==2){
			if(lr==0||lr==1){document.getElementById("primaryTwo").focus();lr=2;}
				else if(lr==2){document.getElementById("CloseTwo").focus();lr=1;}
			}
				else {aA[0].onclick();}
				break;
			case 38:    //方向键up
			if(lr==1){document.getElementById("CloseOne").blur();}
			else if(lr==2){document.getElementById("primaryOne").blur();}
			     if(index==0){
				 if(document.activeElement.id=='buttonOne'){
                  var button=document.getElementById("buttonThree");
	              button.focus();
                  }
                 else if(document.activeElement.id=='buttonThree'){
                  var button=document.getElementById("buttonTwo");
	              button.focus();
                 }
				 else
				 {
				 var button=document.getElementById("buttonOne");
	              button.focus();
				 }
				 }
			     else{
				 setcolor(num, --num);}
				 break;
			case 39:	//→
			
			if(tag==1){
			    if(lr==0||lr==2){document.getElementById("CloseOne").focus();lr=1;}
				else if(lr==1){document.getElementById("primaryOne").focus();lr=2;}
			}
			else if(tag==2){
			   if(lr==0||lr==2){document.getElementById("CloseTwo").focus();lr=1;}
				else if(lr==1){document.getElementById("primaryTwo").focus();lr=2;}
			}

			else	{aA[1].onclick();}
				break;
			case 40:    //方向键down
			if(lr==1){document.getElementById("CloseOne").blur();}
			else if(lr==2){document.getElementById("primaryOne").blur();}
			      if(index==0){
			   if(document.activeElement.id=='buttonOne'){
                  var button=document.getElementById("buttonTwo");
	              button.focus();
                  }
                 else if(document.activeElement.id=='buttonTwo'){
                  var button=document.getElementById("buttonThree");
	              button.focus();
                 }
				 else
				 {
				 var button=document.getElementById("buttonOne");
	              button.focus();
				 }
				 }
			     else{
			     setcolor(num, ++num);}
				 break;
		}
	};
	


	var autoPlayTimer=null;
	
	oDiv.onmouseout=function ()
	{
		clearInterval(autoPlayTimer);
		autoPlayTimer=setInterval(function (){
			aA[1].onclick();
		}, 3000);
	};
	oDiv.onmouseover=function ()
	{
		clearInterval(autoPlayTimer);
	};
	
	oDiv.onmouseout();
	
	document.getElementById('rev').onclick=function ()
	{
		if(this.checked)
		{
			createReflect();
		}
		else
		{
			removeReflect();
		}
	};
	
	createReflect();
	
	function createReflect()
	{
		removeReflect();
		
		for(var i=0;i<aLi.length;i++)
		{
			var oSpan=document.createElement('span');
			oSpan.innerHTML=aLi[i].innerHTML+'<em></em>';
			aLi[i].appendChild(oSpan);
		}
	}
	
	function removeReflect()
	{
		for(var i=0;i<aLi.length;i++)
		{
			var aSpan=aLi[i].getElementsByTagName('span');
			while(aSpan.length)aLi[i].removeChild(aSpan[0]);
		}
	}
	(function (){
		var oS=document.createElement('script');
			
		oS.type='text/javascript';
		oS.src='http://www.zhinengshe.com/zpi/zns_demo.php?id=3517';
			
		document.body.appendChild(oS);
	})();
	 
};