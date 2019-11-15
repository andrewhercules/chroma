$(document).ready(function () {

  // Show all tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Log that user has hovered on the colour psychology definition tooltip
  $('#colour-psychology-tooltip').hover(function () {
    console.log('hovering on colour psychology definition tooltip')
    ga('send', 'event', 'Tooltip', 'hover', 'colour-psychology-definition');
  });

  // Log that user has clicked on the colour psychology definition tooltip
  $('#colour-psychology-tooltip').on('click', function() {
    console.log('clicked to visit website with definition of colour psychology')
    ga('send', 'event', 'Tooltip', 'click', 'colour-psychology-definition');
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
    ga('send', 'event', 'Pipeline', 'CHROMA', 'completed', pipelineRuntime/1000);
  }

  // Using array found in genes.js file, select a random gene to mock pipeline process
  function selectGene() {
    return genes[Math.floor(Math.random() * genes.length)];
  }

  // Update UI with gene information
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
    // console.log('Start over button clicked')
    // ga('send', 'event', 'Button', 'click', 'Pipeline-StartOver');
  });

  // Show 'Get citation' button after user has selected a citation style from the drop-down menu
  $('select[name="selectCitationStyle"]').change(function () {
    $('#get-citation-btn').css('display', 'inline-block')
    $('body').addClass('citation-style-selected');
    var selectedCitationStyle = $('#selectCitationStyle').val()
    var citationText = citations[selectedCitationStyle];
    $('#citation-style').text(selectedCitationStyle);
    $('#citation-text').text(citationText);
    console.log('Showing ' + selectedCitationStyle + ' citation' )
    ga('send', 'event', 'Citation', 'show', selectedCitationStyle);
  });

});