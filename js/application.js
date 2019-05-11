genes = [
  {
    "ensemblId": "12345",
    "uniprotId": "P12345",
    "hgncSymbol": "ESR1",
    "description": "estrogen receptor 1",
    "therapeuticArea": "oncology",
    "pipelineColour": "grey",
    "pipelineAssessment": "ESR1 has been implicated in a number of cancers and there are approved drugs in Phase IV that are known to modulate this target."
  },
  {
    "ensemblId": "67890",
    "uniprotId": "P67890",
    "hgncSymbol": "APP",
    "description": "amyloid precursor protein",
    "therapeuticArea": "neurology",
    "pipelineColour": "blue",
  },
  {
    "ensemblId": "54321",
    "uniprotId": "P54321",
    "hgncSymbol": "INSR",
    "description": "insulin receptor",
    "therapeuticArea": "immunology",
    "pipelineColour": "green",
  },
]

citations = {
  "apa": "Hercules, A & Averbrook, G. (2019). Target Of The Year: the application of colour theory and design to bioinformatics. Nature Design, 1(1), 5-10.",
  "chicago": 'Hercules, Andrew and Gillian Averbrook. "Target Of The Year: the application of colour theory and design to bioinformatics." Nature Design 1, no. 1 (2019): 5-10',
  "harvard": "Hercules, A & Averbrook, G 2019, 'Target Of The Year: the application of colour theory and design to bioinformatics', Nature Design, vol. 1, no. 1, pp. 5-10.",
  "mla": 'Hercules, Andrew and Averbrook, Gillian. "Target Of The Year: the application of colour theory and design to bioinformatics." Nature Design, vol. 1, no. 1, 2019, pp. 5-10.',
  "oxford": "Hercules, A. and G. Averbrook, 'Target Of The Year: the application of colour theory and design to bioinformatics',  Nature Design, vol. 1, no. 1, 2019, pp. 5-10."
},


$(document).ready(function () {
  // $('#get-citation-btn').hide();
});



// Show spinner for 3 seconds, then return to original screen
$('#run-pipeline-btn').on("click", function (event) {
  event.preventDefault();
  $("body").addClass("loading");
  // add event to track that pipeline has started to run
  setTimeout(function () {
    // add event to track that pipeline has finished running
    $("body").removeClass("loading");
    $("body").addClass("finished-loading");
    $('#run-pipeline-btn').hide();
    $('#run-pipeline-block').hide();
    selectGene()
  }, 500);

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
    
  }, 500);
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
