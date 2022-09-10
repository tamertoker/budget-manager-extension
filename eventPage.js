const contextMenuItem = {
	"id": "spendMoney",
	"title": "Add to spendings",
	"contexts" : ["selection"]
};
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(contextMenuItem);
});


var myHeaders = new Headers();
myHeaders.append("apikey", myapikey); // my api key is hidden

var requestOptions = {
  method: 'GET',  
  redirect: 'follow',
  headers: myHeaders
};

chrome.contextMenus.onClicked.addListener(function(clickData){
	if (clickData.menuItemId == "spendMoney" && clickData.selectionText){
				price = clickData.selectionText
			if(price.includes("TL")){
				price = price.replace(/[A-Za-z]/g, "").split('$').join('').split(' ').join('')
				price = price.split('.').join('')
			}

			if (price.includes("$")){
				price = price.replace(/[A-Za-z]/g, "").split('$').join('').split(' ').join('')
			}

			fetch(`https://api.apilayer.com/exchangerates_data/convert?to=TRY&from=USD&amount=${price}`, requestOptions)
		  .then(response => response.json())
		  .then(data => {
		  	price = data.result
		  				chrome.storage.sync.get(['total', 'limit'], function(budget){
				let newTotal = 0;
				console.log(price)
				if (budget.total){
					newTotal += parseFloat(budget.total);
				}
				newTotal += parseFloat(price);
				chrome.storage.sync.set({'total': newTotal}, function(){
					if (newTotal >= budget.limit){
						notifID = "notification-" + new Date().getTime()
					const notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit reached! ',
						message: "Uh oh! Looks like you've reached your limit!"
					};
					chrome.notifications.create(notifID, notifOptions)
					}
				});
			});
		}).catch(error => console.log('error', error));
	};

		  })
		  

chrome.storage.onChanged.addListener(function(changes, storageName){
	chrome.action.setBadgeText({"text":changes.total.newValue.toString()})
})

