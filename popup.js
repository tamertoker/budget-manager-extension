$(function(){

	chrome.storage.sync.get(['total', 'limit'], function(budget){
		$('#total').text(budget.total)
		$('#limit').text(budget.limit)
	})

	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total', 'limit'], function(budget){
			let newTotal = 0;
			if (budget.total){
				newTotal += parseFloat(budget.total);
			}

			let amount = $('#amount').val();
			if(amount){
				newTotal += parseFloat(amount);
			}

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

			$('#total').val(newTotal);
			$('#total').text(newTotal)
			$('#amount').val('');

		})
	})




})