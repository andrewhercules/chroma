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

citations = [
  {
    "style": "APA",
    "citation": "Hercules, A. (2019). Target Of The Year: the application of colour theory and design to bioinformatics. Nature Design, 1(1), 5-10."
  },
  {
    "style": "Chicago",
    "citation": 'Hercules, Andrew. "Target Of The Year: the application of colour theory and design to bioinformatics." Nature Design 1, no. 1 (2019): 5-10'
  },
  {
    "style": "Harvard",
    "citation": "Hercules, A 2019, 'Target Of The Year: the application of colour theory and design to bioinformatics', Nature Design, vol. 1, no. 1, pp. 5-10."
  },
  {
    "style": "MLA",
    "citation": 'Hercules, Andrew. "Target Of The Year: the application of colour theory and design to bioinformatics." Nature Design, vol. 1, no. 1, 2019, pp. 5-10.'
  },
  {
    "style": "Oxford",
    "citation": "Hercules, A., 'Target Of The Year: the application of colour theory and design to bioinformatics',  Nature Design, vol. 1, no. 1, 2019, pp. 5-10."
  }
];

$(document).ready(function () {
  console.log("ready!");
  console.log(targets[0])
});



// Show spinner for 3 seconds, then return to original screen
$('#run-pipeline-btn').on("click", function (event) {
  event.preventDefault();
  $("body").addClass("loading");
  setTimeout(function () {
    $("body").removeClass("loading");
    $("body").addClass("finished-loading");
    $('#run-pipeline-btn').hide();
    $('#run-pipeline-block').hide();
    selectTarget()
  }, 500);

});

function selectTarget() {
  var randomTarget = targets[Math.floor(Math.random() * targets.length)];
  $('#target-name').text(randomTarget.hgnc_symbol);
}

// Show spinner for 3 seconds, then return to original screen
$('#rerun-pipeline-btn').on("click", function () {
  $('#pipeline-results').hide();
  $("body").addClass("loading");
  setTimeout(function () {
    $("body").removeClass("loading");
    $("body").addClass("finished-loading");
    $('#pipeline-results').show();
    $('#run-pipeline-btn').hide();
    selectTarget()
  }, 500);
});
