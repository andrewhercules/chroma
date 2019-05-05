targets = [
  {
    "ensembl_id": "",
    "uniprot_id": "",
    "hgnc_symbol": "",
    "description": "",
    "therapeutic_area": "",
    "colour": "",
  },
]

$( document ).ready(function() {
  console.log( "ready!" );
  console.log(targets[0])
});



// Show spinner for 3 seconds, then return to original screen
$('#run-pipeline-btn').on("click", function(){
  $("body").addClass("loading");
  setTimeout(function(){ 
    $("body").removeClass("loading");
    $("body").addClass("finished-loading"); 
    $('#run-pipeline-btn').hide();
    $('#target-name').text('ESR1');
  }, 3000);
  
  
});
