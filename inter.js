$(function(){
    var operation = "A";
    var selectedindex = -1;
    var tbUsers = localStorage.getItem("tbUsers");
    tbUsers = JSON.parse(tbUsers);

		if(tbUsers == null){
	    tbUsers = [];
		}

		$("#frmUser").on("submit",function(){
			if(operation == "A"){
			    return Addition(tbUsers);
			}else{
			    return Edit(tbUsers,selectedindex);
			}
		});

		List(tbUsers);

		$("#tbList").on("click", ".btnEdit", function(){
	    operation = "E";
	    selectedindex = parseInt($(this).attr("alt"));
			var usr = JSON.parse(tbUsers[selectedindex]);
	    $("#txtFirstname").val(usr.Firstname);
	    $("#txtLastname").val(usr.Lastname);
	    $("#txtUsername").val(usr.Username);
	    $("#txtEmail").val(usr.Email);
		  $("#txtFirstname").focus();
		});

		$("#tbList").on("click", ".btnDelete",function(){
	    selectedindex = parseInt($(this).attr("alt"));
			Delete(tbUsers, selectedindex);
	    List(tbUsers);
		});
});

function Addition(tbUsers){

		var cliente = JSON.stringify({
        Firstname    : $("#txtFirstname").val(),
        Lastname     : $("#txtLastname").val(),
        Username     : $("#txtUsername").val(),
        Email        : $("#txtEmail").val()
    });
    tbUsers.push(cliente);
		console.log("tbUsers - " + tbUsers);
    localStorage.setItem("tbUsers", JSON.stringify(tbUsers));
    alert("Data Added.");
    return true;
}

function Edit(tbUsers,selectedindex){
    tbUsers[selectedindex] = JSON.stringify({
            Firstname    : $("#txtFirstname").val(),
            Lastname     : $("#txtLastname").val(),
            Username     : $("#txtUsername").val(),
            Email        : $("#txtEmail").val()
        });
    localStorage.setItem("tbUsers", JSON.stringify(tbUsers));
    alert("Data Edited")
    operation = "A";
    return true;
}

function Delete(tbUsers, selectedindex){
    if(confirm('Are you sure you want to delete this record?')){
        tbUsers.splice(selectedindex, 1);
        localStorage.setItem("tbUsers", JSON.stringify(tbUsers));
        alert("Data Deleted.");
    }
}

function List(tbUsers){
    $("#tbList").html("");
    $("#tbList").html(
        "<thead>"+
        "   <tr>"+
        "   <th></th>"+
        "   <th>ID</th>"+
        "   <th>Firstname</th>"+
        "   <th>Lastname</th>"+
        "   <th>Username</th>"+
        "   <th>Email</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var i in tbUsers){
        var usr = JSON.parse(tbUsers[i]);
        $("#tbList tbody").append("<tr>");
        $("#tbList tbody").append("<td><img src='icons8-pencil-24.png' alt='"+i+"'class='btnEdit'/><img src='icons8-trash-24.png' alt='"+i+"' class='btnDelete'/></td>");
        $("#tbList tbody").append("<td>"+i+"</td>");
        $("#tbList tbody").append("<td>"+usr.Firstname+"</td>");
        $("#tbList tbody").append("<td>"+usr.Lastname+"</td>");
        $("#tbList tbody").append("<td>"+usr.Username+"</td>");
        $("#tbList tbody").append("<td>"+usr.Email+"</td>");
        $("#tbList tbody").append("</tr>");
    }
}

    function deleteData(){
    localStorage.clear()
    location.reload(true);
}