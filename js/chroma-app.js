$(document).ready(function () {

  // After user has answered two questions, run pipeline to generate and display response after 3 seconds
  $('#run-pipeline-btn').on("click", function (event) {
    $('#run-pipeline-block').hide();
    startPipeline(event);
    setTimeout(function () {
      chromaPipeline();
    }, 3000);
  });

   // After user has run pipeline for the first time, if they select 'Re-run pipeline', run the same pipeline 
   $('#rerun-pipeline-btn').on("click", function (event) {
    $('#pipeline-results').hide();
    startPipeline(event);
    setTimeout(function () {
      $('#pipeline-results').show();
      chromaPipeline();
    }, 3000);
  });

  // Initialise and start CHROMA pipeline
  function startPipeline(event) {
    event.preventDefault();
    $("body").addClass("loading"); 
    console.log('pipeline started')
  }

  // run CHROMA pipeline
  function chromaPipeline() {
    $("body").removeClass("loading");
    $("body").addClass("finished-loading");
    $('#run-pipeline-btn').hide();
    selectGene()
    console.log('pipeline finished')
  }

  // Using array found in genes.js file, select a random gene to mock pipeline process and update UI with results
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

  // If user clicks 'Start over', hide section with pipeline results and display form to run pipeline
  $('#clear-pipeline-results-btn').on('click', function (event) {
    event.preventDefault();
    $('#pipeline-results').hide();
    $('#run-pipeline-btn').show();
    $('#run-pipeline-block').show();
  });

  // Show 'Get citation' button after user has selected a citation style from the drop-down menu
  $('select[name="selectCitationStyle"]').change(function () {
    $('#get-citation-btn').css('display', 'inline-block')
  });

  // When user clicks on 'Get citation' button, get the relevant citation and display
  $('#get-citation-btn').on("click", function (event) {
    event.preventDefault();
    $('body').addClass('citation-style-selected');
    var selectedCitationStyle = $('#selectCitationStyle').val()
    var citationText = citations[selectedCitationStyle];
    $('#citation-style').text(selectedCitationStyle);
    $('#citation-text').text(citationText);
  });

});