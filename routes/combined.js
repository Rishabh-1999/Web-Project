<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="http://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">

<link rel="stylesheet" type="text/css" href="/css/navBar.css">
<link rel="stylesheet" type="text/css" href="/css/sidebar.css">
<link rel="stylesheet" type="text/css" href="css/trumbowyg.css">
<link rel="stylesheet" type="text/css" href="css/communitystyle.css">
<link rel="stylesheet" type="text/css" href="css/sirstyle.css">

<script src="http://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>

<script src="script/trumbowyg.min.js"></script>

<% include paritials/topbar.ejs %>
<% if(data.isActive == "true"){ %>
  <% include paritials/sidebar.ejs %>
<% } %>

<style type="text/css">
  



</style>

<div id="page-content-wrapper"> <!--Margin Top is new-->
         <div class="container-fluid page-content-div" style="padding:0">
            <div class="row">
               <div class="col-lg-12 scoll-possible" style="padding:0">



<!--====================================================================-->
<div class="community-header-top" style="height:50px;padding-top:6px;">
<div class="col-sm-12 community-sub-head">
    <a class="btn community-head-btn active" onclick="initaliseTable()">
      <i class="fa fa-users"></i>
    </a>
    <a class="btn community-head-btn" style="margin-left:10px" href="/communityalllists">
      <i class="fa fa-search"></i>
    </a>
</div>
</div>
<!--====================================================================-->
<div class="container">
<div class="col-sm-12">
  <div class="panel panel-default allSidesSoft community-panel-main-div">
    <div class="panel-heading community-panel-heading" style="color:white;font-weight:bold;display:flex; ">
      
        <p style="flex:1;float: left; margin: 10px;">My Communities</p>
        <a href="/addCommunity" class="btn btn-info community-panel-btn" style="float:right;margin: 10px;">Create</a>
      
    </div>
    <div class="panel-body" style="padding-bottom:0">
      
        <div id="can-create-community">
          <!--My Community-->
        <div class="col-sm-12 col-xs-12 myCommunity community-div" style="display: flex;">
          <div class="col-sm-1 col-xs-3" style="padding:10px;flex:1;">
          <a href="">
            <img src="images/defaultcommunity.jpg" class="cpic">
          </a>
        </div>
        <div class="col-sm-10 col-xs-7" style="padding:20px;overflow:scroll">
          <p style="margin:0">
            <a class="comnametxt" href="">hi</a>
            <a class="comnametxt-user" href="">Request(0)</a>
          </p>
        </div>
        <div class="col-sm-1 col-xs-2">
          <a class="community-short-btn" href="" style="float:right;">
            <label class="btn btn-success" style="cursor:pointer !important;">
              <i class="fa fa-cogs"></i>
            </label>
          </a>
        </div>
      </div>

        <div id="community-that-am-in">
          <!--Joined Community-->
        
    </div>

    <div class="panel-body">
      <div id="my-pending-commuity">
        <!--Pending Community-->
      </div>
    </div>

  </div>
</div>
</div>
<br>
<!--====================================================================-->

</div>
</div>
</div>
</div>
<script type="text/javascript">
  
  $(document).ready(function() {
  initaliseTable();
})

  function initaliseTable()
  {
    document.getElementById('can-create-community').innerHTML="";
    var s="true"
    var xml=new XMLHttpRequest();
    xml.open("GET","/superadmincommunityTable/getArrayOwnCommunity");
    xml.setRequestHeader("Content-Type","application/json");
    console.log("okokokoko");
    xml.addEventListener("load",function()
    {
     
     var data=JSON.parse(xml.responseText);
     console.log(data);
      for(var i=0;i<data.length;i++)
      {
       addToDOM(data[i],s)
      }
      initaliseTable1();
     })
    xml.send();
  }

  function initaliseTable1()
  {
    var s="false"
    var xml=new XMLHttpRequest();
    xml.open("GET","/superadmincommunityTable/getArrayOtherCommunity");
    xml.setRequestHeader("Content-Type","application/json");
    
    xml.addEventListener("load",function()
    {
     
     var data=JSON.parse(xml.responseText);
     // console.log(data);
      for(var i=0;i<data.length;i++)
      {
       addToDOM(data[i],s)
      }
     })
    xml.send();
  }

  function addToDOM(obj,s)
  {
    // console.log(obj)
    var div1=document.createElement('div');
    div1.setAttribute("class","col-sm-12 col-xs-12 myCommunity community-div");
    div1.setAttribute("style","display: flex;");
    var div2=document.createElement('div');
    div2.setAttribute("class","col-sm-1 col-xs-3")
    div2.setAttribute("style", "padding:10px;flex:1;")
    var a1=document.createElement('a');
    a1.setAttribute("href","#")
    var img=document.createElement('img')
    img.setAttribute("src",obj.photoloc)
    img.setAttribute("class","cpic")
    a1.appendChild(img)
    div2.appendChild(a1)
    div1.appendChild(div2)
    var div3=document.createElement('div')
    div3.setAttribute("class","col-sm-10 col-xs-7")
    div3.setAttribute("style","padding:20px;overflow:scroll")
    var p=document.createElement('p')
    var a2=document.createElement('a');
    a2.setAttribute("class","comnametxt")
    a2.href="/superadmincommunityTable/"+obj._id;
    a2.innerHTML=obj.name
    var a3=document.createElement('a')
    a3.setAttribute("class","comnametxt-user")
    a3.href="/superadmincommunityTable/"+obj._id;

    a3.innerHTML=" Request("+")";
    p.appendChild(a2)
    p.appendChild(a3)
    div3.appendChild(p)
    div1.appendChild(div3)
    if(s=="true")
    {
    var div4=document.createElement('div')
        div4.setAttribute("class","col-sm-1 col-xs-2")
        var a4=document.createElement('a')
        a4.setAttribute("class","community-short-btn")
        a4.innerHTML=obj.name;
        a4.href="/superadmincommunityTable/"+obj._id;
        // a4.setAttribute("onclick","changepage("+"'"+obj._id+"'"+","+"'"+obj.name+"'"+")")
        // a4.setAttribute("id",obj._id)
        a4.setAttribute("style","float:right;")
        var l1=document.createElement('label')
        l1.setAttribute("class","btn btn-success")
        l1.setAttribute("style","cursor:pointer !important;")
        var i1=document.createElement('i')
        i1.setAttribute("class","fa fa-cogs")
        l1.appendChild(i1)
        a4.appendChild(l1)
        div4.appendChild(a4)
        div1.appendChild(div4)
    }

    document.getElementById('can-create-community').appendChild(div1)
  }
  function changepage(d,d1)
  {
    console.log(d)
    console.log(d1)
    var f=new Object()
    f._id=d;
    f.name=d1;
    var xml=new XMLHttpRequest()
    xml.open("GET","/superadmincommunityTable/manageCommunity")
    xml.setRequestHeader("Content-Type","application/json");
    xml.addEventListener("load",function()
    {
     
      
     })
    xml.send(JSON.stringify(f));
  }
</script>