var url = "http://ec2-54-254-176-201.ap-southeast-1.compute.amazonaws.com/exp1/browserHistory";
var name = "";

function saveChanges(name, callback) {
	chrome.storage.sync.set({'name': name}, callback);
}

function sendData(name, hi){
	var obj = {}, xhr;
	obj.name = name;
	obj.url = hi.url;
	obj.date = hi.lastVisitTime;
	obj.title = hi.title;
	obj.typedCount = hi.typedCount;
	obj.browser='yes';
	
	xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log('Success Response : ' + xhr.responseText);
		} else {
			console.log('Response Failed');
		}
	}
	xhr.send(JSON.stringify(obj));
}

chrome.history.onVisited.addListener(function (hi) {
	chrome.storage.sync.get("name", function(obj){	
		if(obj.name === "" || obj.name === undefined) 
		{
			name = prompt("Please Enter your name : ", "");
			saveChanges(name, function(){
				sendData(name, hi);
			})
		} else {
			sendData(obj.name, hi);
		}
	});
	
		/*
		console.log("Visited " + hi.url);
		console.log("Count " + hi.visitCount);
		console.log("LastVisit  " + hi.lastVisitTime);
		console.log("typedCount  " + hi.typedCount);
		console.log("typedCount  " + hi.id);
		*/		
})
/*
chrome.tabs.onActivated.addListener(function (activeInfo) {
console.log("Activated : tab : " + activeInfo.tabId);
//console.log("Active @ ");
chrome.tabs.get(activeInfo.tabId, function (currTab) {

console.log("Active URL " + currTab.url);
});

});

chrome.tabs.onCreated.addListener(function (tab) {
//console.log('Created');
})
chrome.tabs.onUpdated.addListener(function (id, changeInfo, tab) {
//console.log('Updated ' + id + " : URL : " + tab.url);
})

chrome.tabs.query({'active': true}, function(tabs) {
  //console.log('Hi');
  //console.log(tabs.url);
  
  //chrome.tabs.update(tabs[0].id, {url: "http://googl.com"});
});
*/
