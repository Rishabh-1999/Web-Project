  $(document).ready(function() {
  
})
  function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}
  $.trumbowyg.svgPath = '/css/trumbowyg.svg';
$('#body').trumbowyg();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

document.getElementById('create').addEventListener("click",function()
{
  document.getElementById("add").submit();
})

function createCommunity()
{
  // var obj=new Object()
  // obj.name=$('#communityname').val();
  // obj.description=strip_html_tags($('#body').val());
  // if(document.getElementById('directrule').checked=="true")
  //   obj.rule="Direct";
  // else
  //   obj.rule="Permission";
  // var dat= new Date();
  // var datestr="";
  // datestr=dat.getDate();
  // datestr=datestr+"-"+dat.getMonth();
  // datestr=datestr+"-"+dat.getFullYear();
  // datestr=datestr+" ("+formatAMPM(dat)+")";
  // obj.createdate=datestr;
  
  // console.log(obj)
  // var xml=new XMLHttpRequest();

  // xml.open("POST","/userTable/addCommunity");
  // xml.setRequestHeader("Content-Type","application/json");
  // // document.getElementById("communityform").submit();
  // xml.addEventListener("load",function()
  // {
  //   var res=xml.responseText;
  //   if(res=="true")
  //   {
      
  //     alert("Community Created");
  //     window.location="/communityPage"
  //   }
  //   else
  //   {
  //     alert("Community creation failed");
  //   }
  // })
  // xml.send(JSON.stringify(obj));
}