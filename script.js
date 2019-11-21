var colorMap = new Map()
colorMap.set("LILLA", ["863B7A","670067","400572", "8B19E6", "CEA3F5", "9796FF"])
colorMap.set("LYSERØD", ["FF75E9", "FF00FF","FFB6F3","FF96FF","FFB2BE"])
colorMap.set("RØD", ["FF9897","820010","670000","FF1139","FF0000"])
colorMap.set("ORANGE", ["713806","674200","E26F03","FFA600","F4C6A3"])
colorMap.set("GUL", ["FFFF00","FFDC95","FFFF93"])
colorMap.set("GRØN", ["666700","006700","00FF00","95FF95"])
colorMap.set("BLÅ", ["037676","00FEFF","88FFFF","004F87","0097FF","7BC9FF","000068", "0000FF"])
colorMap.set("SORT", ["000000"])
colorMap.set("GRÅ", ["555555","5A5A5A","9B9B9B","2D2D2D"])
colorMap.set("HVID", ["FFFFFF"])



function searchForImage (color) {

  //Make a variable for the request to the API of the type XMLHttpRequest
  var request = new XMLHttpRequest()

  //Choose random color within the selected "Main" colors.
  var lsColor =  colorMap.get(color)
  var randomIndex = Math.floor(Math.random() * lsColor.length)
  var colorToUse = lsColor[randomIndex]

  //Prepare the request
  request.open('GET', 'https://api.smk.dk/api/v1/art/search/?keys=*&filters=%5Bcolors%3A%23' + colorToUse + '%5D' , true)

  

  //This code will run when we get an answer to the request
  request.onload = function() {

    // The API responds with data in a format called JSON
    // Here we convert it to a JavaScript object, so we can work with it.
    var data = JSON.parse(this.response)
    console.log(data)



    

    //Check if the request was successful
    if (request.status >= 200 && request.status < 400) {

    //Go through all the images and add them to an HTML IMG element
    var pictureLength = data.items.length
    var randomIndex = Math.floor(Math.random() * pictureLength)
    var picture = data.items[randomIndex]
  
  

    var thumbnailUrl = picture.image_thumbnail
    //var artist = picture.credit_line
   

      //Check if there is an image related to work. If there isn't we skip it.
      if (thumbnailUrl != undefined){

        document.getElementById("title").innerHTML = ''
        var titleElement = document.createElement("DIV")
        //Make variable to store the title text
        var titleText = picture.titles[0].title
        //Add the title text to the title element
        titleElement.appendChild(document.createTextNode(titleText))
        document.getElementById("title").appendChild(titleElement)

        document.getElementById("artist").innerHTML = ''
        var creditElement = document.createElement("DIV")
        //Make variable to store the artist text
        var artistText = picture.credit_line
        //Add the artist text to the artist element
        creditElement.appendChild(document.createTextNode(artistText))
        document.getElementById("artist").appendChild(creditElement)

        document.getElementById("production").innerHTML = ''
        var productionElement = document.createElement("DIV")
        //Make variable to store the production text
        var productionText = picture.production_date[0].period
        //Add the production text to the production element
        productionElement.appendChild(document.createTextNode(productionText))
        document.getElementById("production").appendChild(productionElement)
        
        document.getElementById("search-images").innerHTML = ''
        //Make an <img> element
        var img = document.createElement("IMG")
        //Put the thumbnail link into the source attribute so it becomes <img src="IMAGE_LINK">
        img.src = thumbnailUrl
        //Put the new <img> element into the element with the ID "search images"
        document.getElementById("search-images").appendChild(img)

      //If the request was not successful write error in the console
      } else {
        console.log('error')
      }
    }
  }
  //Send the request
  request.send()
}