const request = require('request')

request({
  uri: "http://xkcd.com/1100/",
}, function(error, response, body) {
	//GET THE COMIC IMAGE URL
	//Find the specific URL of the comic:
	const comicDivIndex = body.indexOf('imgs.xkcd.com/comics/')
	//Find the end of the URL string by finding the code that comes right after it. The second
	//parameter determines where the search will begin:
	const endComicURL = body.indexOf(" title=", comicDivIndex)
	//The comicURL is the substring between the comicDivIndex and the endComicURL (minus 1):
	const comicURL = (body.substring(comicDivIndex, endComicURL-1))
	

	//GET THE COMIC TITLE TEXT
	//Find the first title after the instance of comicDivIndex:
	const titleIndex = body.indexOf('title="', comicDivIndex)
	//Find the end of the string by finding the index of the alt:
	const endTitleIndex = body.indexOf(('" alt="'), titleIndex)
	//The text begins 7 positions after the titleIndex and ends at endTitleIndex:
	const comicText = body.substring(titleIndex +7, endTitleIndex)

	console.log("COMIC URL:", comicURL)
	console.log("TEXT:", comicText)

})