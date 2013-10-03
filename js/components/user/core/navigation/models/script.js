$.Model('Script',
/* @Static */
{
	getServerApp: function(componentObject, success){

		url=base_url+componentObject.serverApp;

		$.ajax({
			url: url,
			success: success/*function(result){

				try{
					componentObject.json = $.parseJSON(result);
					componentObject.html = '';
				}
				catch(e){
					componentObject.html = result;
					componentObject.json = '';
				}

				OpenAjax.hub.publish('server_ready', componentObject);

			}*/
		});

	}
},
{}
/* @Prototype */
);
