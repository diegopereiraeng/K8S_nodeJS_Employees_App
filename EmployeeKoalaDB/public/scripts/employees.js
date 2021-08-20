selectedList=[];

$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
            console.log("All Selected")
            selectedList=[];
			checkbox.each(function(){
				this.checked = true; 
                selectedList.push(this.value)                       
			});
		} else{
            selectedList=[];
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);          
		}
        if(this.checked){
            console.log("Selected: "+this.value)
            selectedList.push(this.value)
		}
        else{
            for( var i = 0; i < selectedList.length; i++){ 
                if ( selectedList[i] === this.value) { 
                    console.log("Removed from list " + selectedList.splice(i, 1)); 
                }
            
            }
        }
	});
    $("#deleteEmployee").click(function(){
        console.log("deleteEmployee")
        $.each( selectedList, function( index, value ){
            console.log("deleteEmployee: "+value)
            $.post("./employee/:id/delete", {_id:value},function(data, status){
                
                console.log("Data: " + data + "\nStatus: " + status);
            });
        });
    
    });
});



