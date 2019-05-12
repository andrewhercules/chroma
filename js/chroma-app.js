$(document).ready(function () {
  // $('#get-citation-btn').hide();
});



// Show spinner for 3 seconds, then return to original screen
$('#run-pipeline-btn').on("click", function (event) {
  event.preventDefault();
  $('#run-pipeline-block').hide();
  $("body").addClass("loading");
  // add event to track that pipeline has started to run
  setTimeout(function () {
    // add event to track that pipeline has finished running
    
    $("body").removeClass("loading");
    $("body").addClass("finished-loading");
    $('#run-pipeline-btn').hide();
    
    selectGene()
  }, 5500);

});

function selectGene() {
  var randomGene = genes[Math.floor(Math.random() * genes.length)];
  $('#gene-name').text(randomGene.hgncSymbol);
  $('#gene-description').text(randomGene.description);
  $('#gene-colour-profile').text(randomGene.pipelineColour);
  $('#gene-pipeline-assessment').text(randomGene.pipelineAssessment)

  $('#gene-open-targets-link').attr("href", "https://www.targetvalidation.org/target/" + randomGene.ensemblId);
  $('#gene-ensembl-link').attr("href", "https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=" + randomGene.ensemblId);
  $('#gene-uniprot-link').attr("href", "https://www.uniprot.org/uniprot/" + randomGene.uniprotId);
  $('#gene-genecards-link').attr("href", "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" + randomGene.hgncId);
  $('#gene-gnomad-link').attr("href", "https://gnomad.broadinstitute.org/gene/" + randomGene.hgncId);
}

// Show spinner for 3 seconds, then return to original screen
$('#rerun-pipeline-btn').on("click", function () {
  $('#pipeline-results').hide();
  $("body").addClass("loading");
  setTimeout(function () {
    $("body").removeClass("loading");
    $("body").addClass("finished-loading");
    $('#pipeline-results').show();
    selectGene()
    $('#run-pipeline-btn').hide();
    
  }, 5500);
});

$('#get-citation-btn').on("click", function(event) {
  event.preventDefault();
  $('body').addClass('citation-style-selected');
  var selectedCitationStyle = $('#selectCitationStyle').val()
  var citationText = citations[selectedCitationStyle];
  $('#citation-text').text(citationText);
});

$('select[name="selectCitationStyle"]').change(function() {
  $('#get-citation-btn').css('display', 'inline-block')
});

$('#clear-pipeline-results-btn').on('click', function(event){
  event.preventDefault();
  $('#pipeline-results').hide();
  $('#run-pipeline-btn').show();
  $('#run-pipeline-block').show();
});
