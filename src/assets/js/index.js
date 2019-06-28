
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
   
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;



$('.colorpicker') .on('colorpickerChange colorpickerCreate', function (e) {
       $('.color').val(e.value)
        });


  function buy() {

    /* setTimeout(function () {
      document.getElementById("openModalButton").click();
      var btn = document.getElementById("down1");
        var selector = pQuery(btn);
        (new PayExpresse({
            item_id: 1,
        })).withOption({
            requestTokenUrl: 'http://127.0.0.1:5000/pay',
            method: 'POST',
            headers: {
                "Accept": "application/json"
            },
            //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
            prensentationMode: PayExpresse.OPEN_IN_POPUP,
            didPopupClosed: function (is_completed, success_url, cancel_url) {
                if (is_completed === true) {
    
        window.location.href = success_url;               
                } else {
                    window.location.href = cancel_url
                }
            },
            willGetToken: function () {
                console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                alert('erreur inconnu', error.toString());
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                console.log('non success response ', jsonResponse);
                alert(jsonResponse.errors);
                selector.prop('disabled', false);
            }
        }).send({
            pageBackgroundRadianStart: '#0178bc',
            pageBackgroundRadianEnd: '#00bdda',
            pageTextPrimaryColor: '#333',
            paymentFormBackground: '#fff',
            navControlNextBackgroundRadianStart: '#608d93',
            navControlNextBackgroundRadianEnd: '#28314e',
            navControlCancelBackgroundRadianStar: '#28314e',
            navControlCancelBackgroundRadianEnd: '#608d93',
            navControlTextColor: '#fff',
            paymentListItemTextColor: '#555',
            paymentListItemSelectedBackground: '#eee',
            commingIconBackgroundRadianStart: '#0178bc',
            commingIconBackgroundRadianEnd: '#00bdda',
            commingIconTextColor: '#fff',
            formInputBackgroundColor: '#eff1f2',
            formInputBorderTopColor: '#e3e7eb',
            formInputBorderLeftColor: '#7c7c7c',
            totalIconBackgroundRadianStart: '#0178bc',
            totalIconBackgroundRadianEnd: '#00bdda',
            formLabelTextColor: '#292b2c',
            alertDialogTextColor: '#333',
            alertDialogConfirmButtonBackgroundColor: '#0178bc',
            alertDialogConfirmButtonTextColor: '#fff'
        });
    }, 500) */

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/ads",
      datatype: "json",
      contentType: 'application/json',
      success: function (response) {


      },

      data: JSON.stringify(data),
    });
}
$(".save").on("click", ()=>{
  buy()
})

/* $(".paper-nav-toggle").on("click", ()=>{
  showTab()
}) */
/* var elementIsClicked = false; // declare the variable that tracks the state
function clickHandler(){ // declare a function that updates the state
  elementIsClicked = true;
  if (elementIsClicked == true) {
    $('body').addClass('sidebar-open')
  } else {
    $('body').removeClass('sidebar-open')
  }

}

// check if the element has been clicked every 2 seconds:
function isElementClicked (){
  console.log(elementIsClicked ? 'CLICKED' : 'NOT');
}
setInterval(isElementClicked, 2000);

var element = document.getElementsByClassName('paper-nav-toggle'); // grab a reference to your element
element.on('click', clickHandler); // associate the function above with the click event */

$('.sub').on("click", ()=>{
 takeScreenShotAdwords()
})
$(".paper-nav-toggle").on("click", () => {
  showTab()
})

 
/*  window.onresize = function(event) {
     $("body").removeClass("sidebar-open")
}; */

$(document).ready(() => {
/*   var data = $('.ages').select2('data');
  console.log(data) */

/*   setInterval(isElementClicked, 2000); */
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('pay');
  var timerInterval;
  data = "ok"
  if (myParam != undefined) {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/ads",
      datatype: "json",
      contentType: 'application/json',
      success: function (response) {


      },

      data: JSON.stringify(data),
    });
  } else {
    
  }
});

/* function terminer(){
  var canavas = document.querySelector("#canvas")
  Swal.fire({
  title: 'Sweet!',
  text: 'Modal with a custom image.',
  imageUrl: canvas.toDataURL('image/jpg '),
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: 'Custom image',
  animation: false
});

} */

var takeScreenShotAdwords = function () {

    var description = $("#description");
    var email = $("#email");
    var titre = $("#titre")
    var infos_desc = $("#infos-desc");
    var infos_titre = $("#infos-titre"); 
    var infos_email = $("#infos-email")
   /*  var infos_prix = $("#infos-prix"); */
    var img = $('#final-img-adwords')
  var ADS = {}

    html2canvas(document.querySelector("#canvas"), {
        onrendered: function (canvas) {
      
          
                var tempcanvas = document.createElement('canvas');
                tempcanvas.width = 600;
                tempcanvas.height = 314;
                var context = tempcanvas.getContext('2d');
                var AR = calculateAspectRatio(canvas, tempcanvas);
                context.drawImage(canvas, AR.startX, AR.startY, AR.renderableWidth, AR.renderableHeight);
                img = tempcanvas.toDataURL("image/jpg")
                var data = {
                    'description': description.val(),
                    'email': email.val(),
                    'titre': titre.val(),
                    'img': img
                }
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/session",
                    datatype: "json",
                    contentType: 'application/json',
                    success: function (response) {
                        console.log(response)

                    },

                    data: JSON.stringify(data),
                });
             $('#final-img-adwords').attr('src', tempcanvas.toDataURL('image/jpg')) //function blocks CORS
            infos_desc.val(description.val())
    infos_titre.val(titre.val())
    console.log($('#final-img-adwords'))

        }

    });

    document.getElementById("btn1").click();
    document.getElementById("openModalButton").click();

}

var calculateAspectRatio = function (image, canvas) {
    var imageAspectRatio = image.width / image.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;
    var AspectRatio = new Object();
    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = image.width * (renderableHeight / image.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width;
        renderableHeight = image.height * (renderableWidth / image.width);
        xStart = 0;
        yStart = (canvas.width - renderableHeight) / 2;
    }

    //keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
    AspectRatio.renderableHeight = renderableHeight;
    AspectRatio.renderableWidth = renderableWidth;
    AspectRatio.startX = xStart;
    AspectRatio.startY = yStart;
    return AspectRatio;
}

