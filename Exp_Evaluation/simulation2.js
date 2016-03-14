var postfix = [];
var operand = [];
var stack = [];
var oprelement;
var moveleft = 0;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function hideImage() //hiding stack and instruction box
    {
      document.getElementById("stack").style.visibility = "hidden";
      document.getElementById("instrId").style.visibility = "hidden";
    }

function showImage() //showing stack and instruction box
    {
      document.getElementById("stack").style.visibility = "visible";
      document.getElementById("instrId").style.visibility = "visible";
    }

function checkVal() //validation checking
{
  infixStr = document.getElementById("textbox").value;
  if(infixStr == "**press C and start**")
  {
     document.getElementById("textbox").style.color = "red";
     hideImage();
  }
  else if(infixStr==""||infixStr==null)
  {
    alert("please enter valid input");
    document.getElementById("infixId").innerHTML="Given Exp=>";
    document.getElementById("postfixId").innerHTML="Postfix Exp=>";
  }
  else
  {
    infixToPostExp();
   // postfixEval();
  }
}
//converting infix expression to postfix expression
function infixToPostExp()
{ 
    document.getElementById("infixId").innerHTML="Given Exp=>";
    document.getElementById("postfixId").innerHTML="Postfix Exp=>";
    postfix = infixStr.split(""); //splited given infix string into an array
    for(var i=0; i<postfix.length; i++)
    {
      var row = document.getElementById("rowlen");
      var x = row.insertCell(i);
      x.style.padding = "5px 12px 5px 10px";
      x.style.fontSize = "20px";
      x.style.fontWeight = "bold";
      x.style.backgroundColor = "#FFA500";
      x.style.color = "black";
      x.innerHTML = postfix[i];
    }
    for(var i=0; i<postfix.length; i++)
    {
      if((postfix[i]=="0")||(postfix[i]=="1")||(postfix[i] =="2")||(postfix[i]=="3")||(postfix[i]=="4")||(postfix[i]=="5")||(postfix[i]=="6")||(postfix[i]=="7")||(postfix[i]=="8")||(postfix[i]=="9"))
      {
        operand.push(postfix[i]);
        appendOperand(postfix[i]);
      }
      else if(stack.length=="0")
      {
        stack.push(postfix[i]);
        pushOperator(postfix[i]);
      }
      else if((postfix[i] == "*")||(postfix[i] == "/"))
      {
        for ( var k= stack.length; k >0; k--) 
        {
          if((stack[k-1] == "*")||(stack[k-1] == "/")||(stack[k-1] == "^"))
          {
            oprelement = stack.pop();
            operand.push(oprelement);
            stack.push(postfix[i]);
            poppushOperator(postfix[i]);
            //frame();
          }
          else
          {
            stack.push(postfix[i]);
            pushOperator1(postfix[i]);
          }
        }
      }
      else if(postfix[i] == "^")
      {
        for( var l= stack.length; l >0; l--)
        {
          if(stack[l-1] == "^")
          {
            oprelement = stack.pop();
            operand.push(oprelement);
            stack.push(postfix[i]);
            poppushOperator(postfix[i]);
          }
          else
          {
            stack.push(postfix[i]);
            pushOperator1(postfix[i]);
          }
        }
      }
      else if(postfix[i] == "(")
      {
        stack.push(postfix[i]);
        pushOperator1(postfix[i]);
      }
      else if(postfix[i] == ")")
      {
        for(var m= stack.length; m >0; m--)
        {
          if((stack[m-1] == "+")||(stack[m-1] == "-")||(stack[m-1] == "*")||(stack[m-1] == "/")||(stack[m-1] == "^"))
          {
            oprelement = stack.pop();
            operand.push(oprelement);
            popRightpara(postfix[i]);
          }
          else
          {
            oprelement = stack.pop();
            removeRightpara();
          }
        }
      }
    }
    for(var n = 0; n < stack.length; n++)
    {
      oprelement = stack.pop();
      operand.push(oprelement);
      popAlloprs();
      break;
    }
  }

function appendOperand(key)
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft }, 2500, function(){
    for(var i=0; i<postfix.length; i++)
    {
      var row = document.getElementById("rowlen1");
      var x = row.insertCell(--i);
      x.style.padding = "5px 12px 5px 10px";
      x.style.fontSize = "20px";
      x.style.fontWeight = "bold";
      x.style.color = "#FF5B09";
      x.innerHTML = key;
      $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("appending operand to the postfix string");
      break;
    }
  });
}

function pushOperator(key)
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
      document.getElementById("row1").firstChild.innerHTML=key;
      $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
    });
}

function pushOperator1(key)
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML=="")
      {
        $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
        table.rows[top].cells[0].innerHTML= key;
        break;
      }
    }
  });
}

function poppushOperator(key)
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
     for (var top = 0,row = 0; row< table.rows.length; top++,row++) 
     {
      var opr = table.rows[top].cells[0].innerHTML;
      if((opr == "*")||(opr == "/")||(opr == "^"))
      {
        for(var i=0; i<postfix.length; i++)
        {
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(--i);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping the operator from the stack and adding it to the postfix string and pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
          x.innerHTML = opr;
          table.rows[top].cells[0].innerHTML = key;
          break;
        // myMove(opr);
       }
      }
     }
  });
}

function popRightpara(key)
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
     for (var top = 0,row = 0; row< table.rows.length; top++,row++) 
     {
      var opr = table.rows[top].cells[0].innerHTML;
      if((opr == "*")||(opr == "/")||(opr == "^")||(opr == "+")||(opr == "-"))
      {
        for(var i=0; i<postfix.length; i++)
        {
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(--i);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping the operator from the stack and adding it to the postfix string");
          table.rows[top].cells[0].innerHTML = null;
          break;
        // myMove(opr);
       }
      }
     }
  });
}

function removeRightpara()
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
     for (var top = 0,row = 0; row< table.rows.length; top++,row++) 
    {
      var opr = table.rows[top].cells[0].innerHTML;
      if(opr == "(")
      {
        $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("deleting the operator from the stack");
        //sleep(1000);
        //row.deleteCell(--i);
        table.rows[top].cells[0].innerHTML = null;
        break;
        //myMove(opr);
      }
    }
  });
}

function popAlloprs()
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
     for (var top = 0,row = 0; row< table.rows.length; top++,row++) 
     {
      var opr = table.rows[top].cells[0].innerHTML;
     }
     if((opr == "*")||(opr == "/")||(opr == "^"))
      {
        for(var n = 0; n< stack.length; n++)
        {
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(--n);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping the operator from the stack and adding it to the postfix string and pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
          x.innerHTML = opr;
          table.rows[top].cells[0].innerHTML = null;
          // myMove(opr);
        }
      }
  });
}

