//Calling the three example request below
searchForImage()
getImagebyID()
searchForArtist()

function searchForImage () {

  //Make a variable for the request to the API of the type XMLHttpRequest
  var request = new XMLHttpRequest()

  //Make a variable for the search term
  var searchKey = 'hest'

  //Prepare the request
  request.open('GET', 'https://api.smk.dk/api/v1/art/search?keys=' + searchKey, true)

  //This code will run when we get an answer to the request
  request.onload = function() {

    // The API responds with data in a format called JSON
    // Here we convert it to a JavaScript object, so we can work with it.
    var data = JSON.parse(this.response)
    console.log(data)

    //Check if the request was successful
    if (request.status >= 200 && request.status < 400) {

    //Go through all the images and add them to an HTML IMG element
    data.items.forEach(element => {
      console.log(element.id)

      var thumbnailUrl = element.image_thumbnail

      //Check if there is an image related to work. If there isn't we skip it.
      if (thumbnailUrl != undefined){
        //Make an <img> element
        var img = document.createElement("IMG")
        //Put the thumbnail link into the source attribute so it becomes <img src="IMAGE_LINK">
        img.src = thumbnailUrl
        //Put the new <img> element into the element with the ID "search images"
        document.getElementById("search-images").appendChild(img)
      }
    })

    //If the request was not successful write error in the console
    } else {
      console.log('error')
    }
  }

  //Send the request
  request.send()
}


//Get a specific image based on its ID
function getImagebyID() {

  //Make a variable for the request to the API of the type XMLHttpRequest
  var request = new XMLHttpRequest()

  //Make a variable for the object id
  var collectionID = 'kks1982-156'

  //Prepare the request
  request.open('GET', 'https://api.smk.dk/api/v1/art/?object_number=' + collectionID, true)

  //This code will run when we get an answer to the request
  request.onload = function() {

    // The API responds with data in a format called JSON
    // Here we convert it to a JavaScript object, so we can work with it.
    var data = JSON.parse(this.response)
    console.log(data)

    //Check if the request was successful
    if (request.status >= 200 && request.status < 400) {

    //We check the return data in a loop. However it probably only contains one element when requesting a specific element
    data.items.forEach(element => {
      console.log(element.id)


      //Make an element for the image
      var img = document.createElement("IMG")
      //Add the thumbnail URL to that element
      img.src = element.image_thumbnail

      //Make an element for the title
      var titleElement = document.createElement("DIV")
      //Make variable to store the title text
      var titleText = element.titles[0].title
      //Add the title text to the title element
      titleElement.appendChild(document.createTextNode(titleText))

      //Make an element for the credits
      var creditElement = document.createElement("DIV")
      //Make a variable for the credit text
      var creditText = element.credit_line[0]
      //Add the credit text to the credit element
      creditElement.appendChild(document.createTextNode(creditText))

      //Add the three elements above to the id-images element on the page
      document.getElementById("id-images").appendChild(img)
      document.getElementById("id-images").appendChild(titleElement)
      document.getElementById("id-images").appendChild(creditElement)
    })

    } else {
      console.log('error')
    }
  }

  //Send the request
  request.send()
}

function searchForArtist() {

    //Make a variable for the request to the API of the type XMLHttpRequest
    var request = new XMLHttpRequest()

    //Make a variable for the artist name
    var artistName = 'Eckersberg'

    //Prepare the request
    //This type of request will search for a name and return all results on that name.
    //If you want a very specific artist, it is better to figure out their ID first and request it with https://api.smk.dk/api/v1/person//?id=PERSONID
    request.open('GET', 'https://api.smk.dk/api/v1/person/search/?keys=' + artistName, true)

    //This code will run when we get an answer to the request
    request.onload = function() {

      // The API responds with data in a format called JSON
      // Here we convert it to a JavaScript object, so we can work with it.
      var data = JSON.parse(this.response)
      console.log(data)

      //Check if the request was successful
      if (request.status >= 200 && request.status < 400) {

      //Prepare a list element to show show the results in
      var listElement = document.createElement("OL")

      //We check the return data in a loop.
      data.items.forEach(element => {

        //Make a list item for each returned artist
        var listItem = document.createElement("LI")
        var name = element.name
        var worksCount = element.works.length
        listItem.appendChild(document.createTextNode(name + " - Number of works: " + worksCount))
        listElement.appendChild(listItem)

        //Add the three elements above to the id-images element on the page
        document.getElementById("artist-images").appendChild(listElement)
      })

      } else {
        console.log('error')
      }
    }

    //Send the request
    request.send()
}
