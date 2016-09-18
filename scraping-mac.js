const request = require('request')




const startString = "<a name="


//THIS FUNCTION WILL CREATE AN ARRAY OF INDICES AT WHICH startDayString IS FOUND IN BODY
//I FOUND IT ON STACKOVERFLOW
function getIndices(str, toSearch) {
	const indices = [];
	for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
		indices.push(pos);
		}
	return indices
	}


//REQUEST THE HTML
request({
  uri: "http://buyersguide.macrumors.com/#iOS",
}, function(error, response, body) {
	
	const data = []
	const days=[]
	const devices=[]
	const averages = []
	const indices = getIndices(body, startString)

	
	

	
	for (i = 0; i < indices.length; i ++){
		//DAYS SINCE RELEASE
		//search for the position of the first instance of 'class="count' after each index:
		let daysStartIndex = body.indexOf('class="count', indices[i])
		//search for the position of the closing of that tag (there are a few different classes, so have to take an intermediate step):
		let daysIntermediateIndex = body.indexOf('">', daysStartIndex)
		//search for the tag that closes the day count:
		let daysEndIndex = body.indexOf('</span>', daysIntermediateIndex)

		//find the substring 2 characters after the intermeidate and until the end index
		let daysSinceRelease = body.substring((daysIntermediateIndex+2), (daysEndIndex))
		days.push(daysSinceRelease)


		//DEVICE NAME
		let deviceNameStartIndex = body.indexOf('title="', indices[i])
		let deviceNameEndIndex = body.indexOf('/>', deviceNameStartIndex)
		let deviceName = body.substring((deviceNameStartIndex+7), (deviceNameEndIndex-1))
		devices.push(deviceName)
	
		//AVERAGE RELEASE
		let averageReleaseStartIndex = body.indexOf('<span class="days"', indices[i])
		let averageReleaseEndIndex = body.indexOf('</span', averageReleaseStartIndex)
		let averageRelease = body.substring((averageReleaseStartIndex+19), averageReleaseEndIndex)
		averages.push(averageRelease)
	}


	for (i = 0; i < days.length; i ++) {
		data.push({days:days[i], device:devices[i], average:averages[i]})
	}

	// console.log(data)

	for (i = 0; i < data.length; i ++) {
		if (Number(data[i].days) > Number(data[i].average)) {
			console.log("❌  ", data[i].device + ": It is overdue by", (data[i].days - data[i].average), "days. Don't buy!")
		} else {
			console.log("✅  ", data[i].device + ": It is", (data[i].average - data[i].days), "days until the next release. Buy!")
		}
	}
	


	

})



