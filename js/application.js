targets = [
  {
    "ensembl_id": "12345",
    "uniprot_id": "P12345",
    "hgnc_symbol": "ESR1",
    "description": "estrogen receptor 1",
    "therapeutic_area": "oncology",
    "colour": "grey",
  },
  {
    "ensembl_id": "67890",
    "uniprot_id": "P67890",
    "hgnc_symbol": "APP",
    "description": "amyloid precursor protein",
    "therapeutic_area": "neurology",
    "colour": "blue",
  },
  {
    "ensembl_id": "54321",
    "uniprot_id": "P54321",
    "hgnc_symbol": "INSR",
    "description": "insulin receptor",
    "therapeutic_area": "immunology",
    "colour": "green",
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
    selectTarget()
  }, 3000);
  
function selectTarget() {
  var randomTarget = targets[Math.floor(Math.random() * targets.length)];
  $('#target-name').text(randomTarget.hgnc_symbol);
}
  
});
