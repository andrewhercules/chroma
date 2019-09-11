$(document).ready(function () {

  // Show all tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Log that user has hovered on the colour theory definition tooltip
  $('#colour-theory-tooltip').hover(function () {
    console.log('hovering on colour theory definition tooltip')
    ga('send', 'event', 'Tooltip', 'hover', 'colour-theory-definition');
  });

  $('#colour-theory-tooltip').hover(function () {
    console.log('clicked to visit website with definition of colour theory')
    ga('send', 'event', 'Tooltip', 'click', 'colour-theory-definition');
  });

  // After user has answered two questions, initalise and run pipeline, and display response after 3 seconds
  $('#run-pipeline-btn').on('click', function (event) {
    event.preventDefault();
    times = [2000, 3000, 4000, 5000, 6000];
    pipelineRuntime = times[Math.floor(Math.random() * times.length)];
    $('#run-pipeline-block').hide();
    $('body').addClass('loading');
    console.log('CHROMA pipeline is running')
    setTimeout(function () {
      runCHROMAPipeline(pipelineRuntime);
    }, pipelineRuntime);
  });

  // run CHROMA pipeline
  function runCHROMAPipeline(pipelineRuntime) {
    $('body').removeClass('loading');
    $('body').addClass('finished-loading');
    $('#run-pipeline-btn').hide();
    randomGene = selectGene();
    updateUI(randomGene);
    $('#pipeline-results').show();
    console.log('CHROMA pipeline has finished')
    ga('send', 'event', 'Pipeline', 'CHROMA', 'completed', pipelineRuntime/1000 );
  }

  // Using array found in genes.js file, select a random gene to mock pipeline process, and update UI with results
  function selectGene() {
    return genes[Math.floor(Math.random() * genes.length)];
  }

  function updateUI(randomGene) {
    $('#gene-name').text(randomGene.hgncSymbol);
    $('#gene-description').text(randomGene.description);
    $('#gene-colour-profile').text(randomGene.pipelineColour);
    $('#gene-pipeline-assessment').text(randomGene.pipelineAssessment)
    $('#gene-open-targets-link').attr('href', 'https://www.targetvalidation.org/target/' + randomGene.ensemblId);
    $('#gene-ensembl-link').attr('href', 'https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=' + randomGene.ensemblId);
    $('#gene-uniprot-link').attr('href', 'https://www.uniprot.org/uniprot/' + randomGene.uniprotId);
    $('#gene-genecards-link').attr('href', 'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' + randomGene.hgncId);
    $('#gene-gnomad-link').attr('href', 'https://gnomad.broadinstitute.org/gene/' + randomGene.hgncId);  
  }
  
  // If user clicks 'Start over', hide section with pipeline results and display form to run pipeline
  $('#clear-pipeline-results-btn').on('click', function (event) {
    event.preventDefault();
    $('#run-pipeline-form').trigger('reset');
    $('#pipeline-results').hide();
    $('#run-pipeline-btn').show();
    $('#run-pipeline-block').show();
  });

  // Show 'Get citation' button after user has selected a citation style from the drop-down menu
  $('select[name="selectCitationStyle"]').change(function () {
    $('#get-citation-btn').css('display', 'inline-block')
  });

  // When user clicks on 'Get citation' button, get the relevant citation and display
  $('#get-citation-btn').on('click', function (event) {
    event.preventDefault();
    $('body').addClass('citation-style-selected');
    var selectedCitationStyle = $('#selectCitationStyle').val()
    var citationText = citations[selectedCitationStyle];
    console.log('Showing ' + selectedCitationStyle + ' citation' )
    $('#citation-style').text(selectedCitationStyle);
    $('#citation-text').text(citationText);
    ga('send', 'event', 'Citation', 'download', selectedCitationStyle);
  });

});