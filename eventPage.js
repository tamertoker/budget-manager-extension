const contextMenuItem = {
	"id": "spendMoney",
	"title": "Add to spendings",
	"contexts" : ["selection"]
};
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener(function(clickData){
	if (clickData.menuItemId == "spendMoney" && clickData.selectionText){
		console.log(clickData.selectionText)
			if(clickData.selectionText.includes("TL")){
				clickData.selectionText = clickData.selectionText.replace(/[A-Za-z]/g, "").split('$').join('').split(' ').join('')
				clickData.selectionText = clickData.selectionText.split('.').join('')
			}

			if (clickData.selectionText.includes("$")){
				clickData.selectionText = clickData.selectionText.replace(/[A-Za-z]/g, "").split('$').join('').split(' ').join('')

				clickData.selectionText = parseFloat(Number(clickData.selectionText)) * 18.2
			}


			chrome.storage.sync.get(['total', 'limit'], function(budget){
				let newTotal = 0;
				if (budget.total){
					newTotal += parseFloat(budget.total);
				}
				newTotal += parseFloat(clickData.selectionText);
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
		}
	});

chrome.storage.onChanged.addListener(function(changes, storageName){
	chrome.action.setBadgeText({"text":changes.total.newValue.toString()})
})