$(function(){

	chrome.storage.sync.get(['limit'], function(budget){
		$('#limit').val(budget.limit)
	})

	$('#saveLimit').click(function(){
		var limit = $('#limit').val()

		if (limit){
			chrome.storage.sync.set({'limit': limit}, function(){
				notifID = "notification-" + new Date().getTime()
					const notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit saved! ',
						message: "Your limit has been saved to " + limit + "!"
					};
					chrome.notifications.create(notifID, notifOptions)

			})
		}

	})

	$('#resetTotal').click(function(){
		chrome.storage.sync.set({'total': 0});
			$('#total').val(0);
			$('#total').text(0);
			notifID = "notification-" + new Date().getTime()
					const notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Total reset! ',
						message: "Total has been reset to 0!"
					};
					chrome.notifications.create(notifID, notifOptions)

	}) 
})

	