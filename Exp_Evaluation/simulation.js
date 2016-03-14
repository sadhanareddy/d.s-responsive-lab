var postfix = [];
var operand = [];
var stack = [];
var oprelement;
var moveleft = 0;
var i;

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
  }
}
//converting infix expression to postfix expression
function infixToPostExp()
{ 
    document.getElementById("infixId").innerHTML="Given Exp=>"+" "+" "+infixStr;
    document.getElementById("postfixId").innerHTML="Postfix Exp=>";
    postfix = infixStr.split(""); //splited given infix string into an array
    for(i=0; i<postfix.length; i++)
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
    for(i=0; i<postfix.length; i++)
    {
      if((postfix[i]=="0")||(postfix[i]=="1")||(postfix[i] =="2")||(postfix[i]=="3")||(postfix[i]=="4")||(postfix[i]=="5")||(postfix[i]=="6")||(postfix[i]=="7")||(postfix[i]=="8")||(postfix[i]=="9"))
      {
        operand.push(postfix[i]);
        appendOperand(postfix[i]);
      }

      else if(stack.length=="0") //checking whether stack is empty or not
      {
        stack.push(postfix[i]);
        pushOperatorstck(postfix[i]);
      }

      else if((postfix[i] == "+")||(postfix[i] == "-")) //checking addition and substraction precedence
      {
        for(var j = stack.length; j >0; j--)
        {
          if((stack[j-1] == "+")||(stack[j-1] == "-")||(stack[j-1] == "*")||(stack[j-1] == "/")||(stack[j-1] == "^"))
          {
            poppushOperator(postfix[i]);
            break;
          }
          else
          {
            stack.push(postfix[i]);
            pushOperator(postfix[i]);
            break;
          }
        }
      }

      else if((postfix[i] == "*")||(postfix[i] == "/")) //checking multiplication and division precedence
      {
        for ( var k= stack.length; k >0; k--) 
        {
          if((stack[k-1] == "*")||(stack[k-1] == "/")||(stack[k-1] == "^"))
          {
            poppushOperator1(postfix[i]);
            break;
          }
          else
          {
            stack.push(postfix[i]);
            pushOperator(postfix[i]);
            break;
          }
        }
      }

      else if(postfix[i] == "^") //checking caret precedence
      {
        for(var l = stack.length; l >0; l--)
        {
          if(stack[l-1] == "^")
          {
            poppushOperator2(postfix[i]);
            break;
          }
          else
          {
            stack.push(postfix[i]);
            pushOperator(postfix[i]);
            break;
          }
        }
      }
      else if(postfix[i] == "(") //checking left paranthesis precedence
      {
        stack.push(postfix[i]);
        pushOperator(postfix[i]);
      }
      else if(postfix == ")")  //checking right paranthesis precedence
      {
        for(var m = stack.length; m >0; m--)
        {
          if((stack[m-1] == "+")||(stack[m-1] == "-")||(stack[m-1] == "*")||(stack[m-1] == "/")||(stack[m-1] == "^"))
          {
            oprelement = stack.pop();
            operand.push(oprelement);
            popRightpara();
          }
          else if(stack[m-1] == "(")
          {
            oprelement = stack.pop();
            removeRightpara();
            break;
          }
        }
      }
    }
    for(var m = stack.length; m >0; m--)
    {
      popAllOperators();
      break;
    }
  }

function appendOperand(key) //appending operands
{
  moveleft=moveleft+35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft }, 2500, function(){ 
      var row = document.getElementById("rowlen1");
      var x = row.insertCell(-1);
      x.style.padding = "5px 12px 5px 10px";
      x.style.fontSize = "20px";
      x.style.fontWeight = "bold";
      x.style.color = "#FF5B09";
      x.innerHTML = key;
      $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("appending operand to the postfix string");
  });
}

function pushOperatorstck(key) //pushing operator when stack is empty
{
  moveleft = moveleft + 35;
  console.log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
      document.getElementById("row1").firstChild.innerHTML=key;
      $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
    });
}

function pushOperator(key) //pushing any operators/operands when there is no need to pop the operators from the stack.
{
  moveleft= moveleft + 35;
  console. log(moveleft)
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
        table.rows[top].cells[0].innerHTML= key;
        break;
      }
    }
  });
}

function poppushOperator(key) // popping and pushing operators when multiplication/division operator is found
{
  moveleft= moveleft + 35;
  console.log(moveleft);
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 0; top< table.rows.length; top++) 
    {
      var opr = table.rows[top].cells[0].innerHTML;
        if((opr == "+")||(opr == "-")||(opr == "*")||(opr == "/")||(opr == "^"))
        {  
          oprelement = stack.pop();
          operand.push(oprelement);
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(-1);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping the operator from the stack and adding it to the postfix string and pushing the operator on to the stack");
          x.innerHTML = opr;
          table.rows[top].cells[0].innerHTML = null;
        }
        else if(opr == "(")
        {
          break;
        }
    }
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        $("#instrId").css("color","darkblue").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
        stack.push(postfix[i]);
        table.rows[top].cells[0].innerHTML= key;
        break;
      }
    }
  });
}

function  poppushOperator1(key) // popping and pushing operators when multiplication/division operator is found
{
  moveleft= moveleft + 35;
  console.log(moveleft);
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 0; top< table.rows.length; top++) 
    {  
      var opr = table.rows[top].cells[0].innerHTML;
        if((opr == "*")||(opr == "/")||(opr == "^"))
        {  
          oprelement = stack.pop();
          operand.push(oprelement);
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(-1);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping the operator from the stack and adding it to the postfix string and pushing the operator on to the stack");
          x.innerHTML = opr;
          table.rows[top].cells[0].innerHTML = null;
        }
        else if((opr == "+")||(opr == "-")||(opr == "("))
        {
          break;
        }
    }
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        $("#instrId").css("color","darkblue").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
        stack.push(postfix[i]);
        table.rows[top].cells[0].innerHTML= key;
        break;
      }
    }
  
  });
}

function poppushOperator2(key) // popping and pushing operators when caret operator is found
{
  moveleft= moveleft + 35;
  console.log(moveleft);
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 0; top< table.rows.length; top++) 
    {  
      var opr = table.rows[top].cells[0].innerHTML;
        if(opr == "^")
        {  
          oprelement = stack.pop();
          operand.push(oprelement);
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(-1);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping the operator from the stack and adding it to the postfix string and pushing the operator on to the stack");
          x.innerHTML = opr;
          table.rows[top].cells[0].innerHTML = null;
          stack.push(postfix[i]);
          table.rows[top].cells[0].innerHTML= key;
          break;
        }
    }
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        $("#instrId").css("color","darkblue").css("background-color", "DarkSlateBlue").html("pushing the operator on to the stack since precedence(read input) > precedence(top element on stack))");
        stack.push(postfix[i]);
        table.rows[top].cells[0].innerHTML= key;
        break;
      }
    }
  });
}
function popRightpara(key) //pop out all the operators until the left paranthesis is found.
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
        var row = document.getElementById("rowlen1");
        var x = row.insertCell(-1);
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
  });
}
function removeRightpara() //remove left paranthesis.
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
        table.rows[top].cells[0].innerHTML = null;
        break;
        //myMove(opr);
      }
    }
  });
}

function popAllOperators() // pop out all operators from the stack finaly.
{
  moveleft= moveleft + 35;
  console.log(moveleft);
  $("#arrow1").show().animate({"left":moveleft}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 0; top< table.rows.length; top++) 
    {  
      var opr = table.rows[top].cells[0].innerHTML;
        if((opr == "+")||(opr == "-")||(opr == "*")||(opr == "/")||(opr == "^"))
        { 
          oprelement = stack.pop();
          operand.push(oprelement);
          var row = document.getElementById("rowlen1");
          var x = row.insertCell(-1);
          x.style.padding = "5px 12px 5px 10px";
          x.style.fontSize = "20px";
          x.style.fontWeight = "bold";
          x.style.color = "#FF5B09";
          $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("popping out all the operators from the stack and adding it to the postfix string and pushing the operator on to the stack");
          x.innerHTML = opr;
          table.rows[top].cells[0].innerHTML = null;
        }
    }
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        postfixEval();
        break;
      }
    }

  });
}
var p;
//postfix Evaluation
function postfixEval()
{
  for(p = 0; p < operand.length; p++)
  {
    if((operand[p] == "0")||(operand[p] == "1")||(operand[p] == "2")||(operand[p] == "3")||(operand[p] == "4")||(operand[p] == "5")||(operand[p] == "6")||(operand[p] == "7")||(operand[p] == "8")||(operand[p] == "9"))
    {
      stack.push(operand[p]);
      pushOperand(operand[p]);
    }
    else 
    {
      if(operand[p] == "+")
      {
        firstNum = Number(stack.pop());
        secNum = Number(stack.pop());
        result = secNum + firstNum;
        stack.push(result);
        popAndeval(operand[p]);
        break;
      }
      // if(operand[p] == "-")
      // {
      //   firstNum = stack.pop();
      //   secNum = stack.pop();
      //   result = secNum - firstNum;
      //   stack.push(result);
      //   //popAndeval();
      // }
      // if(operand[p] = "*")
      // {
      //   firstNum = stack.pop();
      //   secNum = stack.pop();
      //   result = secNum * firstNum;
      //   stack.push(result);
      //   //popAndeval();
      // }
      // if(operand[p] = "/")
      // {
      //   firstNum = stack.pop();
      //   secNum = stack.pop();
      //   result = secNum / firstNum;
      //   stack.push(result);
      //   //popAndeval();
      // }
      // if(operand[p] = "^")
      // {
      //   firstNum = Number(stack.pop());
      //   secNum = Number(stack.pop());
      //   result = math.pow(secNum, firstNum);
      //   stack.push(result);
      //   //popAndeval();
      // }
    }
  }
}
var moveleft1 = 0;
function pushOperand(key) //pushing operands on to the stack.
{
  moveleft1= moveleft1 + 35;
  console. log(moveleft1)
  $("#arrow2").show().animate({"left":moveleft1}, 2500, function(){
    var table = document.getElementById("stack");
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("pushing the operand on to the stack");
        table.rows[top].cells[0].innerHTML= key;
        break;
      }
    }
  });
}
//var top;
function popAndeval(key)
{
  moveleft1 = moveleft1 + 35;
  console.log(moveleft1);
  $("#arrow2").show().animate({"left":moveleft1}, 2500, function(){
    var table = document.getElementById("stack");
    for ( var top = 0; top< table.rows.length; top++) 
    { 
      var opr = table.rows[top].cells[0].innerHTML;
      if((opr == "0")||(opr == "1")||(opr == "2")||(opr == "3")||(opr == "4")||(opr == "5")||(opr == "6")||(opr == "7")||(opr == "8")||(opr == "9"))
      { 
         document.getElementById("num2").innerHTML = opr;
         table.rows[top].cells[0].innerHTML = null;
         break;
      }
    }
    for ( var top = 0; top< table.rows.length; top++) 
    { 
      var opr = table.rows[top].cells[0].innerHTML;
      if((opr == "0")||(opr == "1")||(opr == "2")||(opr == "3")||(opr == "4")||(opr == "5")||(opr == "6")||(opr == "7")||(opr == "8")||(opr == "9"))
      {  
         document.getElementById("num1").innerHTML = opr;
         document.getElementById("op").innerHTML = key
         document.getElementById("res").innerHTML ="="+result;
         table.rows[top].cells[0].innerHTML = null;
         break;
      }
    }
    for (var top = 8,row = 0; row< table.rows.length; top--,row++) 
    {
      if(table.rows[top].cells[0].innerHTML == "")
      {
        $("#instrId").css("color","white").css("background-color", "DarkSlateBlue").html("pushing the operand on to the stack");
        table.rows[top].cells[0].innerHTML= result;
        break;
      }
    }

  });
}

function myMove() {
  var table = document.getElementById("stack");
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() 
  {
    if (pos == 150)
    {
      clearInterval(id);
    } 
    else 
    {
      alert(pos);
        pos++; 
        table.rows[top].cells[0].style.bottom = pos + 'px'; 
        table.rows[top].cells[0].style.top= pos + 'px'; 

    }
  }
}

















