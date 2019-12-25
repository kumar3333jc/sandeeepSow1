//nextfuction
$(document).off('click','.next').on('click', '.next', function () {
  var a = $("li[class*=active]").next();
  $("li[class*=active]").removeClass("active");
  a.addClass("active");
}
                                   )
//end next function
//backfunction
$(document).off('click','.back').on('click', '.back', function () {
  var a = $("li[class*=active]").prev();
  $("li[class*=active]").removeClass("active");
  a.addClass("active");
}
                                   )
//end back function
//edit copy/delete
var rowNum;
arr = [];
var globalrow;
var rowToAdd ;
var total = 0;
//Rows select fun
$(document).off('click','.rows').on('click', '.rows', function (e) {
  var allTable = $('#TDS1').html();
  rowNum = $(this).closest('tr').index();
  globalrow = $(e.target).parent();
  arr = [];
  for (var i = 1; i < 5; i++) {
    arr.push($(e.target).parent().children()[i].innerText);
  }
}
                                   );
//Add Button click
$(document).off('click','.add').on('click', '.add', function (e) {
  //alert("add")
  debugger;
  $("#myModal").find("input").prop("disabled", false);
  $("#myModal").find("input").val("");
  localStorage.setItem("btnType", "add");
}
                                  );
//Edit Button Function
$(document).off('click','.edit').on('click', '.edit', function (e) {
  localStorage.setItem("btnType", "edit");
  var allInputs = $("#myModal").find("input").prop("disabled", false);
  $.each(allInputs, (x, y) => {
    $(y).val(arr[x]);
  }
        )
  total = total - globalrow.children()[4].innerText;
}
                                   );
//copy Button Function
$(document).off('click','.copy').on('click', '.copy', function (e) {
  localStorage.setItem("btnType", "copy");
  var allInputs =$("#myModal").find("input").prop("disabled", true);
  $.each(allInputs, (x, y) => {
    $(y).val(arr[x]);
  }
        )
  //$("#myModal").find("input").prop("disabled", false);
}
                                   );
//Delete selected row function
$(document).off('click','.delete').on('click', '.delete', function () {
  total = total - parseInt(globalrow.children()[4].innerText);
  globalrow.remove();
  $(".tot").val(total);
  var c = $("#TDS1 tbody").find("tr").length;
  for(var i=0;i<c-1;i++){
    //	debugger;
    $($("#TDS1 tbody").children()[i]).children()[0].innerText=i+1;
  }
  //alert(c);
}
                                     );
//save_change Function 
$(document).off('click','.save_change').on('click', '.save_change', function () {
  debugger;
  var type = localStorage.getItem("btnType");
  //Save change for edit Popup
  if (type == "edit") {
    $('#mtxt4').val();
    globalrow.children()[1].innerText = $('#mtxt1').val();
    globalrow.children()[2].innerText = $('#mtxt2').val();
    globalrow.children()[3].innerText = $('#mtxt3').val();
    var col4 =parseInt($('#mtxt4').val());
    globalrow.children()[4].innerText=col4;
    total = total+col4;
  }
  //Save change for copy Popup
  else if (type == "copy") {
    var allInputs = $(":input[type=text]");
    $("#TDS1").each(function () {
      rowToAdd= globalrow.clone();
      debugger;
      var col4=parseInt(globalrow.find("td:eq(4)").text());
      total=total+col4;
      rowToAdd.children()[0].innerText=$('#TDS1 tbody tr').length
      $(rowToAdd).insertBefore($($("#TDS1")[0].lastElementChild.lastElementChild));
    }
                   );
  }
  //for Add Popup
  else if (type == "add") {
    ($("#TDS1")[0].children[1].children[0].children[0].innerText).trim() != "" ? "" : $("#TDS1")[0].children[1].children[0].remove();
    var row = document.createElement("tr");
    $(row).addClass("rows");
    var col = document.createElement("td");
    $(col).addClass("del");
    var text = document.createTextNode($($("#TDS1")[0].lastElementChild).children().length - 1 == 0 ? "1" : $($("#TDS1")[0].lastElementChild).children().length);
    col.append(text);
    row.append(col);
    for (var i = 1; i <= 4; i++) {
      var col = document.createElement("td");
      var text = document.createTextNode($("#mtxt" + i).val());
      col.append(text);
      row.append(col);
      //Total Calculate
      if (i == 4) {
        total = total + parseInt($("#mtxt" + i).val());
      }
      //end TotalCalculate
    }
    $(row).insertBefore($($("#TDS1")[0].lastElementChild.lastElementChild));
  }
  $('.tot').val(total);
}
                                          );
//end edit copy/delete
